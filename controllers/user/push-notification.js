const admin = require('firebase-admin');
const serviceAccount = require('../../config/push-notification.json');
const Notification = require('../../models/user/notifications');
const UserFCMTokens = require('../../models/user/userFCM');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.sendPushNotification = async (req, res) => {
  try {
    const { fcm_token } = req.body;

    if (!fcm_token) {
      return res.status(400).json({ message : 'Missing FCM token' });
    }

    const userId = req.user.id;

    const userTokens = await UserFCMTokens.findAll({
      where: {
        user_id: userId,
      },
    });

    console.log(userTokens);

    if (userTokens.length > 0) {
      const notifications = await Notification.findOne({
        where: {
          user_id: userId,
          type: 'product',
          title: 'Product Expired Notification',
        },
      });

      if (notifications) {
        const sendPromises = userTokens.map(async (tokenObj) => {
          try {
            const message = {
              notification: {
                title: "k'ept health",
                body: notifications.description,
              },
              token: tokenObj.fcm_token, 
            };

            await admin.messaging().send(message);
          } catch (sendError) {
          }
        });

        await Promise.all(sendPromises);

        res.status(200).json({ message: 'Notifications sent successfully' });
      } else {
        res.status(204).json({ message: 'No notifications to send' });
      }
    } else {
      res.status(204).json({ message: 'No FCM tokens found for the user' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

