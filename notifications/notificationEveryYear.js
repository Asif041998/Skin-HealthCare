const cron = require('node-cron');
const { Op } = require('sequelize');
const { User } = require('../models/user/user');

const sendOneYearCongratulationNotifications = async () => {
    try {
      // Calculate the date one year ago from today
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  
      // Find users who joined exactly one year ago
      const users = await User.findAll({
        where: {
          createdAt: {
            [Op.between]: [oneYearAgo, new Date()], // Users who joined between one year ago and now
          },
        },
      });
  
      // Send congratulatory notifications to users
      users.forEach((user) => {
        // TODO: Send congratulatory notification to the user (e.g., via email, push notification, etc.)
        console.log(`Sending one-year congratulatory notification to user with ID ${user.id}`);
      });
    } catch (error) {
      console.error('Error sending one-year congratulatory notifications:', error);
    }
  };
  
  // Schedule the function to run every day at a specific time (e.g., 2:30 AM)
  cron.schedule('30 2 * * *', () => {
    console.log('Running one-year congratulatory notification scheduler...');
    sendOneYearCongratulationNotifications();
  });
  