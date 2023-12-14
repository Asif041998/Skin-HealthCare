const con = require("../../database/connection");
const {
  registrationValidations,
  loginValidations,
} = require("../../validations/user/userValidation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../../models/user/user");
const userPutValidation = require("../../validations/user/userUpdate");
dotenv.config();
const emailValidator = require('email-validator');

// FOR USER SIGNUP
exports.registerUser = async (req, res) => {
  try {
    if (!emailValidator.validate(req.body.email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    const { error } = registrationValidations(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    let { firstname, lastname, email, password, state, birth_year, race_id, fcm_token } = req.body;

    password = await bcrypt.hash(password, 10);

    try {
      const existingUser = await User.findOne({ where: { email, deletedAt: null } });
      if (existingUser) {
        return res.status(409).json({ message: 'Email already exists' });
      }

      const newUser = await User.create({
        firstname,
        lastname,
        email,
        password,
        state,
        birth_year,
        race_id,
        fcm_token,
      });

      try {
        await UserFCMToken.create({
          user_id: newUser.id, 
          fcm_token: fcm_token,
        });
      } catch (error) {
        return res.status(500).json({ message: 'Error saving FCM token', error: error.message });
      }

      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Welcome to K'ept Health",
        text: 'Thank you for registering with our service. We are excited to have you as a user!',
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(400).json({ message: error.message });
        } else {
          return res.status(201).json({
            message: 'Account created successfully',
            data: {
              user_id: newUser.id,
              email: email,
              firstname: firstname,
              lastname: lastname,
              state: state,
              birth_year: birth_year,
              race_id: race_id,
              fcm_token: fcm_token,
            },
          });
        }
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
};



//FOR UPDATING THE USER
exports.updateUser = async (req, res) => {
  try {
    const { error } = userPutValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    let { firstname, lastname, state, birth_year, race_id } = req.body;

    const userIdToUpdate = req.params.id;

    try {
      if (req.user.id == userIdToUpdate) {
        let newUser;
        if (userIdToUpdate) {
          await User.update(
            {
              firstname,
              lastname,
              state,
              birth_year,
              race_id,
            },
            {
              where: {
                id: userIdToUpdate,
              },
            }
          );
          newUser = await User.findOne({ where: { id: userIdToUpdate } });
        }

        return res.status(200).json({
          message: userIdToUpdate
            ? "Account updated successfully"
            : "Account updated successfully",
          data: {
            user_id: newUser.dataValues.id,
            firstname: firstname,
            lastname: lastname,
            state,
            birth_year,
            race_id,
          },
        });
      } else {
        return res.status(403).json({ message: "Forbidden" });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json(err.message);
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

//DELETING AN USER
exports.deleteUser = async (req, res) => {
  try {
    const userIdToDelete = req.params.id;
    const deleteReason = req.body.delete_reason;
    if (req.user.id == req.params.id) {
      const userToDelete = await User.findOne({
        where: { id: userIdToDelete },
      });
      if (!userToDelete) {
        return res.status(404).json({ message: "User not found" });
      }

      await userToDelete.update({
        delete_reason: deleteReason,
      });

      await userToDelete.destroy();

      return res.status(200).json({
        message: "Account deleted successfully",
        data: {
          user_id: userIdToDelete,
          email: userToDelete.email,
          firstname: userToDelete.firstname,
          lastname: userToDelete.lastname,
          delete_reason: deleteReason,
        },
      });
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json(err.message);
  }
};

//CONTACT US API FOR USER
const nodemailer = require('nodemailer');

exports.contactUs = async (req, res) => {
  try {
    const { email, description } = req.body;

    const existingContact = await User.findOne({ where: { email } });

    if (existingContact) {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const mailOptions = {
        from: email,
        to: process.env.SENDER_ADDRESS,
        subject: 'New Contact Us Message',
        text: `User Email: ${email}\nMessage: ${description}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ message: 'Error sending email' });
        } else {
          return res.status(200).json({
            message: 'Your message was sent successfully',
            emailSent: true
          });
        }
      });
    } else {
      return res.status(404).json({
        message: 'Email not found. Please provide a valid email.',
      });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(400).send({ error: err.message });
  }
};


//LOGIN
const UserFCMToken = require('../../models/user/userFCM'); 

exports.loginUser = async (req, res) => {
  try {
    const { error } = loginValidations(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password, fcm_token } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    const existingFCMToken = await UserFCMToken.findOne({ where: { user_id: user.id, fcm_token } });
    if (!existingFCMToken) {
      await UserFCMToken.create({ user_id: user.id, fcm_token });
    }

    user.fcm_token = fcm_token || null;
    await user.save();

    const token = jwt.sign(
      { id: user.id, role: "user", createdAt: user.createdAt },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "30d",
      }
    );

    user.token = token;
    await user.save();

    res.header("auth-token", token);

    const userInfo = {
      user_id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      state: user.state,
      birth_year: user.birth_year,
      race_id: user.race_id,
      access_token: token,
      fcm_token: user.fcm_token,
    };

    res.status(200).json({
      message: "Successfully logged in",
      user: userInfo,
      expiresIn: "30d",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




