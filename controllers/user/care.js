const Cares = require("../../models/user/care");
const ValidateId = require("../../services/exceptionHandling");
const nodemailer = require("nodemailer");

// CREATE Care USER
exports.care = async (req, res) => {
  try {
    const {
      user_id,
      answer_id,
      firstname,
      lastname,
      state,
      email,
      skin_concern,
    } = req.body;

    const newCare = await Cares.create({
      user_id,
      answer_id,
      firstname,
      lastname,
      state,
      email,
      skin_concern,
    });

    // Send email
    await sendWelcomeEmail(email);

    return res.status(201).json({
      message: "Care account created successfully",
      data: newCare,
    });
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

async function sendWelcomeEmail(email) {
  try {
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
      from: email,
      to: "concierge@kept.health",
      subject: `Contact for Cares`,
      text: `Please contact me on ${email} and send respective message for the same`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// GET A SPECIFIC Care USER BY ID
exports.getCareUserById = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const exceptionResult = await ValidateId(userId);
    if (exceptionResult) return res.status(400).json(exceptionResult);

    const Care = await Cares.findAll({ where: { user_id: userId } });

    if (!Care) {
      return res.status(200).json({ message: "Care not found", data: [] });
    }

    return res.status(200).json({
      message: "Care fetched successfully",
      data: Care,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
