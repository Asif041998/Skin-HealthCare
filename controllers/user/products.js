const Products = require("../../models/user/products");
const Products_Types = require("../../models/user/productTypes");
const productPostValidation = require("../../validations/user/product/product");
const productPutValidation = require("../../validations/user/product/product");
const ValidateId = require("../../services/exceptionHandling");
const { Op } = require("sequelize");

const cron = require("node-cron");
const moment = require("moment");
const User = require("../../models/user/user");
const Notifications = require("../../models/user/notifications");
const userFCM = require("../../models/user/userFCM");
const admin = require("firebase-admin");
const serviceAccount = require("../../config/push-notification.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// ADD PRODUCTS
exports.products = async (req, res) => {
  try {
    const { error } = productPostValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    let expirationNotificationsSent = false;
    let expiredNotificationsSent = false;

    let userId = req.user.id;
    let {
      user_id,
      image,
      name,
      brand,
      description,
      purchase_location,
      open_date,
      product_type_id,
      price,
      expiration_date,
    } = req.body;

    const existingProduct = await Products.findOne({
      where: { name: name, user_id: userId },
    });

    if (existingProduct) {
      return res.status(409).json({ message: "Product already exists" });
    }

    if (new Date(open_date) > new Date(expiration_date)) {
      return res
        .status(400)
        .json({ error: "Open date cannot be after the expiration date" });
    }
    const product = await Products.create({
      user_id,
      image,
      name,
      brand,
      description,
      purchase_location,
      open_date,
      product_type_id,
      price,
      expiration_date,
    });
    const result = await Products.findAll();

    const sendExpirationNotifications = async (userId, name) => {
      const expirationNotifications = {
        userId,
        message: `Your ${name} will expire in 30 days.`,
      };

      try {
        const existingNotification = await Notifications.findOne({
          where: {
            user_id: userId,
            type: "product",
            title: `${name} will expire in 30 days.`,
            description: expirationNotifications.message,
          },
        });

        if (!existingNotification) {
          await Notifications.create({
            type: "product",
            title: `${name} will expire in 30 days.`,
            description: expirationNotifications.message,
            is_read: 0,
            user_id: userId,
          });

          console.log(
            "Product Expiration notification sent and saved to the database."
          );
        }
      } catch (err) {
        res.status(500).json({ message: err });
      }
    };

    const targetDateForXDays = moment(expiration_date).subtract(30, "days");
    const xDaysCronSchedule = `30 10 ${targetDateForXDays.date()} ${
      targetDateForXDays.month() + 1
    } *`;

    const xDaysTask = cron.schedule(xDaysCronSchedule, async () => {
      if (!expirationNotificationsSent[user_id]) {
        await sendExpirationNotifications(user_id, name);
        expirationNotificationsSent[user_id] = true;
      }
    });

    xDaysTask.start();

    const sendExpiredNotifications = async (userId, name) => {
      const expiredNotifications = {
        userId,
        message: `Your ${name} is expired.`,
      };

      try {
        const existingNotification = await Notifications.findOne({
          where: {
            user_id: userId,
            type: "product",
            title: "Product expired notification.",
            description: expiredNotifications.message,
          },
        });

        if (!existingNotification) {
          await Notifications.create({
            type: "product",
            title: "Product expired notification.",
            description: expiredNotifications.message,
            is_read: 0,
            user_id: userId,
          });

          console.log(
            "Product Expired notification sent and saved to the database."
          );

          await sendPushNotification(userId, expiredNotifications.message);
        } else {
          console.log(
            "Similar notification already exists. Skipping creation."
          );
        }
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    };

    const sendPushNotification = async (userId, notificationMessage) => {
      try {
        const userTokens = await userFCM.findAll({
          where: {
            user_id: userId,
            fcm_token: {
              [Op.not]: null,
            },
          },
        });

        if (userTokens.length > 0) {
          const notifications = await Notifications.findAll({
            where: {
              user_id: userId,
              type: "product",
              title: "Product expired notification.",
            },
          });

          if (notifications && notifications.length > 0) {
            const sendPromises = userTokens.map(async (tokenObj) => {
              try {
                const message = {
                  notification: {
                    title: "k'ept health",
                    body: notificationMessage,
                  },
                  token: tokenObj.fcm_token,
                };
                await admin.messaging().send(message);
              } catch (error) {
                if (
                  error.code === "messaging/registration-token-not-registered"
                ) {
                  console.log(
                    `Invalid or unregistered FCM token: ${tokenObj.fcm_token}`
                  );
                } else {
                  console.error(error);
                }
              }
            });

            await Promise.all(sendPromises);

            console.log("Push notifications sent successfully");
          } else {
            console.log("No notifications to send");
          }
        } else {
          console.log("No FCM tokens found for the user");
        }
      } catch (error) {
        console.error(error);
      }
    };

    console.log(expiration_date);
    const targetDateForExpired = moment(expiration_date);
    const expiredCronSchedule = `30 10 ${targetDateForExpired.date()} ${
      targetDateForExpired.month() + 1
    } *`;

    const expiredTask = cron.schedule(expiredCronSchedule, async () => {
      if (!expiredNotificationsSent[user_id]) {
        await sendExpiredNotifications(user_id, name);
        expiredNotificationsSent[user_id] = true;
      }
    });

    expiredTask.start();

    return res.status(201).json({
      message: "Products added successfully",
      product,
    });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// GET ALL THE  PRODUCTS DETAILS
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Products.findAll({
      include: [
        {
          model: Products_Types,
          as: "product_type",
          attributes: ["name", "expiration_duration_days"],
        },
      ],
    });
    return res.status(200).json({
      message: "Products list fetched",
      data: products,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// UPDATE PRODUCT BY ID
exports.updateProducts = async (req, res) => {
  try {
    const { error } = productPutValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    const productId = req.params.id;
    const updatedData = req.body;
    const userId = req.user.id;
    const exceptionResult = await ValidateId(productId);
    if (exceptionResult) return res.status(400).json(exceptionResult);

    if (updatedData.name) {
      const existingProduct = await Products.findOne({
        where: {
          id: { [Op.not]: productId },
          name: updatedData.name,
          user_id: userId,
        },
      });

      if (existingProduct) {
        return res.status(409).json({
          message: "Product with the same name already exists",
          data: [],
        });
      }
    }

    const userExist = await Products.findOne({
      where: { user_id: userId, id: productId },
    });
    if (!userExist)
      return res
        .status(200)
        .json({ message: "There is no product with this user id", data: [] });

    const [updatedRowsCount] = await Products.update(updatedData, {
      where: { id: productId },
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const updatedProduct = await Products.findByPk(productId);

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// GET PRODUCT BY ID
exports.getByIdProducts = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user.id;
    const exceptionResult = await ValidateId(productId);
    if (exceptionResult) return res.status(400).json(exceptionResult);

    const userExist = await Products.findOne({
      where: { user_id: userId, id: productId },
    });
    if (!userExist)
      return res
        .status(200)
        .json({ message: "There is no product with this user id", data: [] });

    const product = await Products.findByPk(productId, {
      include: [
        {
          model: Products_Types,
          as: "product_type",
          attributes: ["name", "expiration_duration_days"],
        },
      ],
    });

    return res.status(200).json({
      message: "Product details fetched",
      data: product,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// GET PRODUCT BY USER_ID
exports.getByUserIdProducts = async (req, res) => {
  try {
    const id = req.params.user_id;
    const exceptionResult = await ValidateId(id);
    if (exceptionResult) return res.status(400).json(exceptionResult);

    const exist = await Products.findAll({ where: { user_id: id } });
    if (exist.length === 0)
      return res
        .status(200)
        .json({ message: "There is no product with this id", data: [] });

    const product = await Products.findAll({
      where: { user_id: id },
      include: [
        {
          model: Products_Types,
          as: "product_type",
          attributes: ["name", "expiration_duration_days"],
        },
      ],
    });

    return res.status(200).json({
      message: "Product details fetched",
      data: product,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
