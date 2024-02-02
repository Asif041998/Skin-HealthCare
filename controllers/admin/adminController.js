const con = require("../../database/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  registrationValidation,
  loginValidation,
} = require("../../validations/admin/adminValidation");

const Admin = require("../../models/admin/admin");


// ADMIN REGISTER
exports.registerAdmin = async (req, res) => {
  try {
    const { error } = registrationValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    const existingAdmin = await Admin.findOne({ where: { email: req.body.email } });
    if (existingAdmin) {
      return res.status(409).json({ error: "Email already exists" });
    }

    let { firstname, lastname, email, password } = req.body;
    let hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "Admin account created successfully",
      data: { email: email, firstname: firstname, lastname: lastname },
    });
  } catch (err) {
    return res.status(400).json(err.message);
  }
};


//LOGIN AN EXISTING ADMIN
exports.loginAdmin = async (req, res) => {
  try {
    // VALIDATE THE REQUEST BODY
    const { error } = loginValidation(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // CHECK IF THE ADMIN EXISTS
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    // CHECK IF THE PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(password, admin.password);
    if (!validPass) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    // CREATE AND ASSIGN A TOKEN
    const token = jwt.sign({ id: admin.id, role : "admin" }, process.env.REFRESH_TOKEN, {
      expiresIn: "1h",
    });

    // SET THE TOKEN IN THE HEADER
    res.header("auth-token", token);

    // RETURN THE TOKEN AND ADMIN INFO
    const adminInfo = {
      admin_id: admin.id,
      email: admin.email,
      token: token,
    };

    admin.token = token;
    await admin.save();

    res.status(200).json({ admin: adminInfo, expiresIn: "1h" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//CHANGE PASSWORD FOR ADMIN
exports.changePassword = async (req, res) => {
  try {
    const admin = await Admin.findOne({ where: { id: req.params.id } });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;

    if (currentPassword === newPassword) {
      return res.status(400).json({ message: 'New password must be different from the current password.' });
    }

    const passwordMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Current Password not correct.' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    await Admin.update(
      { password: hashedPassword },
      { where: { id: req.params.id } }
    );

    res.status(200).json({ message: 'Password changed successfully.' });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


//ADMIN LOGOUT
exports.logOutAdmin = async (req, res) => {
  try {
    const admin_id = req.user.id;

    const updateQuery = `UPDATE users_admin SET token = '' WHERE id = ?`;

    await con.query(updateQuery, [admin_id]);

    const selectQuery = `SELECT token FROM users_admin WHERE id = ?`;
    const result = await con.query(selectQuery, [admin_id]);

    if (result.length > 0 && result[0].token === "") {
      return res.status(200).send({ message: "Successfully Logout" });
    } else {
      // Handle error if token is not empty or other scenarios
      return res.status(400).send({ message: "Logout failed" });
    }
  } catch (err) {
    return res.status(400).send(err.message);
  }
};