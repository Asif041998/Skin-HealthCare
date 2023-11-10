const cron = require("node-cron");
const { Op } = require("sequelize");
const moment = require("moment");
const { User } = require("../../models/user/user");
const Products = require("../../models/user/products");
const Notifications = require("../../models/user/notifications");
const Questionnaire = require("../../models/user/questionnaire");
const notificationsPostValidation = require("../../validations/user/notifications/post");

exports.notifications = async (req, res) => {
  try {
    const { error } = notificationsPostValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    let { type, title, description, is_read, user_id } = req.body;

    const existingNotification = await Notifications.findOne({
      where: { title },
    });

    if (existingNotification) {
      return res.status(409).json({
        message: "Notification with the same title already exists",
        data: [],
      });
    }

    const newNotification = await Notifications.create({
      type,
      title,
      description,
      is_read,
      user_id,
    });

    return res.status(201).json({
      message: "Notification added successfully",
      newNotification,
    });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

//GET NOTIFICATIONS BY USER ID
exports.notification = async (req, res) => {
  let feedbackNotificationSent = false;
  let oneYearNotificationSent = false;
  let checkInNotificationsSent = false;
  let surveyNotificationsSent = false;
  let expirationNotificationsSent = false;
  let expiredNotificationsSent = false;

  const userId = req.user.id;
  let userCreatedAt = req.user.createdAt;

  const sendFeedbackNotifications = async () => {
    const feedbackNotifications = {
      userId,
      message: `Sending feedback notification to user with ID ${userId}`,
    };

    await Notifications.create({
      type: "support",
      title: "How's it going, notification",
      description: feedbackNotifications.message,
      is_read: 0,
      user_id: userId,
    });

    // console.log("Feedback notification sent and saved to the database.");
  };

  const sendOneYearNotifications = async () => {
    const oneYearNotifications = {
      userId,
      message: `Sending one-year notification to user with ID ${userId}`,
    };

    await Notifications.create({
      type: "normal",
      title: "One-Year Congratulations Notification",
      description: oneYearNotifications.message,
      is_read: 0,
      user_id: userId,
    });

    // console.log("One-year notification sent and saved to the database.");
  };

  const sendCheckInNotifications = async () => {
    const eightWeekNotifications = {
      userId,
      message: `Sending eight week notification to user with ID ${userId}`,
    };

    await Notifications.create({
      type: "normal",
      title: "Routine Check In Notification",
      description: eightWeekNotifications.message,
      is_read: 0,
      user_id: userId,
    });

    // console.log(
    //   "Routine Check In notification sent and saved to the database."
    // );
  };

  const sendSurveyNotifications = async () => {
    const surveyNotifications = {
      userId,
      message: `Sending survey notification to user with ID ${userId}`,
    };

    let usersToNotify = await Questionnaire.findAll({
      where: { user_id: req.user.id },
    });

    // console.log("String to notify", usersToNotify.length);
    if (usersToNotify.length == 0) {
      await Notifications.create({
        type: "survey",
        title: "Take Survey Notification",
        description: surveyNotifications.message,
        is_read: 0,
        user_id: userId,
      });

      // console.log("Take Survey notification sent and saved to the database.");
    }
  };

  const targetDateForFeedback = moment(userCreatedAt).add(4, "days");
  const targetDateForOneYear = moment(userCreatedAt).add(1, "year");
  const targetDateForEightWeeks = moment(userCreatedAt).add(8, "weeks");
  const targetDateForTwoWeeks = moment(userCreatedAt).add(2, "weeks");

  const feedbackCronSchedule = `${targetDateForFeedback.minutes()} ${targetDateForFeedback.hours()} ${targetDateForFeedback.date()} ${
    targetDateForFeedback.month() + 1
  } *`;
  const oneYearCronSchedule = `${targetDateForOneYear.minutes()} ${targetDateForOneYear.hours()} ${targetDateForOneYear.date()} ${
    targetDateForOneYear.month() + 1
  } *`;
  const eightWeekCronSchedule = `${targetDateForEightWeeks.minutes()} ${targetDateForEightWeeks.hours()} ${targetDateForEightWeeks.date()} ${
    targetDateForEightWeeks.month() + 1
  } *`;
  const twoWeekCronSchedule = `${targetDateForTwoWeeks.minutes()} ${targetDateForTwoWeeks.hours()} ${targetDateForTwoWeeks.date()} ${
    targetDateForTwoWeeks.month() + 1
  } *`;

  if (moment(userCreatedAt).year() == moment(new Date()).year()) {
    const feedbackTask = cron.schedule(feedbackCronSchedule, async () => {
      if (!feedbackNotificationSent) {
        // console.log("Running feedback notification scheduler...");
        await sendFeedbackNotifications();
        feedbackNotificationSent = true;
      }
    });

    feedbackTask.start();
  }

  const oneYearTask = cron.schedule(oneYearCronSchedule, async () => {
    if (!oneYearNotificationSent) {
      // console.log("Running one-year notification scheduler...");
      await sendOneYearNotifications();
      oneYearNotificationSent = true;
    }
  });

  oneYearTask.start();

  if (moment(userCreatedAt).year() == moment(new Date()).year()) {
    const eightWeekTask = cron.schedule(eightWeekCronSchedule, async () => {
      if (!checkInNotificationsSent) {
        // console.log("Running Routine Check In notification scheduler...");
        await sendCheckInNotifications();
        checkInNotificationsSent = true;
      }
    });

    eightWeekTask.start();
  }

  if (moment(userCreatedAt).year() == moment(new Date()).year()) {
    const twoWeekTask = cron.schedule(twoWeekCronSchedule, async () => {
      if (!surveyNotificationsSent) {
        // console.log("Running take Survey notification scheduler...");
        await sendSurveyNotifications();
        surveyNotificationsSent = true;
      }
    });

    twoWeekTask.start();
  }

  //Product Expiration in 'X' days Notification
  const sendExpirationNotifications = async (userId) => {
    const expirationNotifications = {
      userId,
      message: `Sending Product Expiration notification to user with ID ${userId}`,
    };

    await Notifications.create({
      type: "product",
      title: "Product Expiration in 30 days Notification",
      description: expirationNotifications.message,
      is_read: 0,
      user_id: userId,
    });

    // console.log(
    //   "Product Expiration notification sent and saved to the database."
    // );
  };

  const products = await Products.findAll({
    where: {
      user_id: userId,
      expiration_date: {
        [Op.not]: null,
      },
    },
    attributes: ["expiration_date", "user_id"],
  });

  // console.log("Products with Expiration Dates:", products);

  for (const product of products) {
    const { expiration_date, user_id } = product;
    const targetDateForXDays = moment(expiration_date).subtract(30, "days");
    const xDaysCronSchedule = `00 09 ${targetDateForXDays.date()} ${
      targetDateForXDays.month() + 1
    } *`;

    const xDaysTask = cron.schedule(xDaysCronSchedule, async () => {
      if (!expirationNotificationsSent[user_id]) {
        // console.log(
        //   "Running X Days for product to expire notification scheduler for User ID",
        //   user_id
        // );
        await sendExpirationNotifications(user_id);
        expirationNotificationsSent[user_id] = true;
      }
    });

    xDaysTask.start();
  }

  //Product Expired Notification
  const sendExpiredNotifications = async (userId) => {
    const expiredNotifications = {
      userId,
      message: `Sending Product Expired notification to user with ID ${userId}`,
    };

    await Notifications.create({
      type: "product",
      title: "Product Expired Notification",
      description: expiredNotifications.message,
      is_read: 0,
      user_id: userId,
    });

    console.log("Product Expired notification sent and saved to the database.");
  };

  const products1 = await Products.findAll({
    where: {
      user_id: userId,
      expiration_date: {
        [Op.not]: null,
      },
    },
    attributes: ["expiration_date", "user_id"],
  });

  // console.log("Products with Expiration Dates:", products1);

  for (const product of products1) {
    const { expiration_date, user_id } = product;
    const targetDateForExpired = moment(expiration_date).subtract(30, "days");
    const expiredCronSchedule = `00 09 ${targetDateForExpired.date()} ${
      targetDateForExpired.month() + 1
    } *`;

    const expiredTask = cron.schedule(expiredCronSchedule, async () => {
      if (!expiredNotificationsSent[user_id]) {
        // console.log(
        //   "Running product expired notification scheduler for User ID",
        //   user_id
        // );
        await sendExpiredNotifications(user_id);
        expiredNotificationsSent[user_id] = true;
      }
    });

    expiredTask.start();
  }

  res.status(200).json({
    message:
      "Notifications scheduled and will be sent as per the configured schedules.",
  });
};

//UPDATE NOTIFICATION is_read=1 after reading notification
exports.updateNotification = async (req, res) => {
  try {
    const notificationType = req.body.type;
    const Id = req.params.id;

    await Notifications.update(
      { is_read: 1 },
      {
        where: {
          type: notificationType,
          user_id: req.user.id,
          id : Id,
          is_read: 0,
        },
      }
    );

    res.status(200).json({
      message: `Notifications of type ${notificationType} marked as read.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: error.message});
  }
};

//GET BY USER ID NOTIFICATION
exports.getByUserIdNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

    const notification = await Notifications.findAll({
      where: {
        [Op.or]: [
          { user_id: userId },
          { user_id: null }, // Include notifications where user_id is 0
        ],
      },
      attributes: { exclude: ["user_id"] },
    });

    if (!notification) {
      return res.status(200).json({
        message: "Notification not found",
        data: [],
      });
    }

    return res.status(200).json({
      message: "Notifications details fetched",
      data: notification,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

//DELETE API
exports.deleteNotificationById = async (req, res) => {
  try {
    const notificationId = req.params.id;

    // Delete the notification by ID
    const deletedNotification = await Notifications.destroy({
      where: {
        id: notificationId,
      },
    });

    if (deletedNotification === 0) {
      return res.status(404).json({
        message: "Notification not found.",
      });
    }

    return res.status(200).json({
      message: "Notification deleted successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

//GET FOR ADMIN
exports.getNotification = async (req, res) => {
  try {
    const userId = req.user.id;

    const notification = await Notifications.findAll({
      where: {
        user_id: null, // Include notifications where user_id is 0
      },
      attributes: { exclude: ["user_id"] },
    });

    if (!notification) {
      return res.status(200).json({
        message: "Notification not found",
        data: [],
      });
    }

    return res.status(200).json({
      message: "Notifications details fetched",
      data: notification,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

//DELETE ADMIN NOTIFICATION
exports.deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;

    // Delete the notification by ID
    const deletedNotification = await Notifications.destroy({
      where: {
        id: notificationId,
        user_id: null,
      },
    });

    if (deletedNotification === 0) {
      return res.status(404).json({
        message: "Notification not found.",
      });
    }

    return res.status(200).json({
      message: "Notification deleted successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
