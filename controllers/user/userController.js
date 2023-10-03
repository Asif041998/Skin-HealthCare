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

// FOR USER SIGNUP
exports.registerUser = async (req, res) => {
  try {
    const { error } = registrationValidations(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    let { firstname, lastname, email, password, state, birth_year, race_id } =
      req.body;

    password = await bcrypt.hash(password, 10);
    try {
      // Check if the email already exists in the database
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ message: "Email already exists" });
      }
      // Create the new user if the email is not a duplicate
      const newUser = await User.create({
        firstname,
        lastname,
        email,
        password,
        state,
        birth_year,
        race_id,
      });

      return res.status(201).json({
        message: "User account created successfully",
        data: {
          user_id: newUser.dataValues.id,
          email: email,
          firstname: firstname,
          lastname: lastname,
        },
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ message: "Internal server error" });
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

    console.log(req.user.id);
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
            ? "User account updated successfully"
            : "User account updated successfully",
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
      return res.status(500).json({ message: "Internal server error" });
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

      // Delete the user
      await userToDelete.destroy();

      return res.status(200).json({
        message: "User deleted successfully",
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
    return res.status(500).json({ message: "Internal server error" });
  }
};

//CONTACT US API FOR USER
const nodemailer = require('nodemailer');

exports.contactUs = async (req, res) => {
  try {
    const { email, description } = req.body;

    // Check if the email already exists
    const existingContact = await User.findOne({ where: { email } });

    if (existingContact) {
      
      // Send email to admin
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true, // Use TLS
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
          console.error('Error sending email:', error);
          return res.status(500).json({ message: 'Error sending email' });
        } else {
          console.log('Email sent: ' + info.response);
          return res.status(200).json({
            message: 'Your message was sent successfully',
              emailSent: true
          });
        }
      });
    } else {
      // Email doesn't exist, return an error
      return res.status(404).json({
        message: 'Email not found. Please provide a valid email.',
      });
    }
  } catch (err) {
    console.error(err.message); // Log the error for debugging
    return res.status(400).send({ error: err.message });
  }
};


//LOGIN
exports.loginUser = async (req, res) => {
  try {
    // VALIDATE THE REQUEST BODY
    const { error } = loginValidations(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // CHECK IF THE USER EXISTS
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    // CHECK IF THE PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    // CREATE AND ASSIGN A TOKEN
    const token = jwt.sign(
      { id: user.id, role: "user" },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    user.token = token;
    await user.save();

    // SET THE TOKEN IN THE HEADER
    res.header("auth-token", token);

    // RETURN THE TOKEN AND USER INFO
    const userInfo = {
      user_id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      state: user.state,
      birth_year: user.birth_year,
      race_id: user.race_id,
      access_token: token,
    };

    res.status(200).json({
      message: "Authentication successfull",
      user: userInfo,
      expiresIn: "1h",
    });
  } catch (err) {
    res.status(500).json({ error: "An error occurred" });
  }
};
