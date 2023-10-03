const cron = require('node-cron');
const { Op } = require('sequelize');
const { User } = require('../models/user/user'); // Adjust the import path as per your project structure

const sendFeedbackNotifications = async () => {
  try {
    // Calculate the date 4 days ago
    const fourDaysAgo = new Date();
    fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);

    // Find users who joined 4 days ago
    const users = await User.findAll({
      where: {
        createdAt: {
          [Op.between]: [fourDaysAgo, new Date()] // Users who joined between 4 days ago and now
        }
      }
    });

    // Send feedback notifications to users
    users.forEach(user => {
      // TODO: Send feedback notification to the user (e.g., via email, push notification, etc.)
      console.log(`Sending feedback notification to user with ID ${user.id}`);
    });
  } catch (error) {
    console.error('Error sending feedback notifications:', error);
  }
};

// Schedule the function to run every day at a specific time (e.g., 2:00 AM)
cron.schedule('0 2 * * *', () => {
  console.log('Running feedback notification scheduler...');
  sendFeedbackNotifications();
});
