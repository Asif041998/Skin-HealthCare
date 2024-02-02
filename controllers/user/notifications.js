const cron = require("node-cron");
const { Op } = require("sequelize");
const moment = require("moment");
const User = require("../../models/user/user");
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
  try {
    console.log(req.user);
    if(req.user.notification == 1)  {
      res.status(400).json({ message: "Notification already sent" });
    }
    else {
      let feedbackNotificationSent = false;
      let oneYearNotificationSent = false;

      const userId = req.user.id;
      const firstName = req.user.firstname;
      let userCreatedAt = req.user.createdAt;

      try {
        await User.update(
          { notification: 1 },
          {
            where: {
              id: userId,
            },
          }
        );
      } catch (error) {}

      const sendFeedbackNotifications = async () => {
        const feedbackNotifications = {
          userId,
          message: `How's it going, ${firstName}? If you've had a good experience until now, please consider rating us on the Play Store.`,
        };

        const existingNotification = await Notifications.findOne({
          where: {
            type: "support",
            title: "How's it going?",
            description: feedbackNotifications.message,
            is_read: 0,
            user_id: userId,
          },
        });

        if (!existingNotification) {
          await Notifications.create({
            type: "support",
            title: "How's it going?",
            description: feedbackNotifications.message,
            is_read: 0,
            user_id: userId,
          });
        }
      };

      const sendOneYearNotifications = async () => {
        const oneYearNotifications = {
          userId,
          message: `Congratulations, ${firstName}!\nToday marks a significant milestone as you celebrate your anniversary with our application. We are thrilled to have had you with us on this journey, and we appreciate your support. Thank you for choosing us, and here's to many more years of satisfaction with our application.`,
        };

        await Notifications.create({
          type: "normal",
          title: "Congratulations on anniversary on our application",
          description: oneYearNotifications.message,
          is_read: 0,
          user_id: userId,
        });
      };

      const targetDateForFeedback = moment(userCreatedAt).add(4, "days");
      const targetDateForOneYear = moment(userCreatedAt).add(1, "year");

      const feedbackCronSchedule = `${targetDateForFeedback.minutes()} ${targetDateForFeedback.hours()} ${targetDateForFeedback.date()} ${
        targetDateForFeedback.month() + 1
      } *`;
      const oneYearCronSchedule = `${targetDateForOneYear.minutes()} ${targetDateForOneYear.hours()} ${targetDateForOneYear.date()} ${
        targetDateForOneYear.month() + 1
      } *`;

      if (moment(userCreatedAt).year() == moment(new Date()).year()) {
        const feedbackTask = cron.schedule(feedbackCronSchedule, async () => {
          if (!feedbackNotificationSent) {
            await sendFeedbackNotifications();
            feedbackNotificationSent = true;
          }
        });

        feedbackTask.start();
      }

      const oneYearTask = cron.schedule(oneYearCronSchedule, async () => {
        if (!oneYearNotificationSent) {
          await sendOneYearNotifications();
          oneYearNotificationSent = true;
        }
      });

      oneYearTask.start();

      res.status(200).json({
        message:
          "Notifications scheduled and will be sent as per the configured schedules.",
      });
    } 
  } catch (error) {
    res.status(500).json({ message: error });
  }
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
          id: Id,
          is_read: 0,
        },
      }
    );

    res.status(200).json({
      message: `Notifications of type ${notificationType} marked as read.`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//GET BY USER ID NOTIFICATION
exports.getByUserIdNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

    const notifications = await Notifications.findAll({
      where: {
        [Op.or]: [
          { user_id: userId },
          { user_id: null }, // Include notifications where user_id is 0
        ],
      },
      attributes: { exclude: ["user_id"] },
      order: [["createdAt", "DESC"]], // Order by createdAt in descending order
    });

    if (!notifications || notifications.length === 0) {
      return res.status(200).json({
        message: "Notification not found",
        data: [],
      });
    }

    return res.status(200).json({
      message: "Notifications details fetched",
      data: notifications,
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
