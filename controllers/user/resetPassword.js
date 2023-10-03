const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const  User  = require('../../models/user/user'); 

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true, // Use TLS
  auth: {
     user: process.env.EMAIL_USER,
     pass: process.env.EMAIL_PASS
  }
});

// Express Route for sending password reset emails
exports.forgotPassword = async (req, res) => {
  
  try {
    const email = req.body.email;
    const token = Math.random().toString(36).substring(7);

    // Update the user's reset_token in the database using Sequelize
    console.log('token', token)
    const [updatedRows] = await User.update(
      { reset_token: token },
      { where: { email: email } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Send the password reset email
    const mailOptions = {
      from: process.env.SENDER_ADDRESS,
      to: email,
      subject: "K'ept Health Cares, Reset Password link",
      text: `Click the following link to reset your password: ${process.env.RESET_PASSWORD_URL}/reset-password/${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Error sending email.' });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Password reset email sent.' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error Updating reset token.' });
  }
};

//RESET PASSWORD FOR USER
exports.resetPassword = async (req, res) => {
  try {
    const token = req.params.reset_token;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    const user = await User.findOne({ where: { reset_token: token } });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.update(
      {password: hashedPassword,
      reset_token: null},
      {where: {email : user.email}}
    );

    res.status(200).json({ message: 'Password changed successfully.' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

