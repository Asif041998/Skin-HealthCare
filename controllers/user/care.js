const Cares = require("../../models/user/care");
const ValidateId = require("../../services/exceptionHandling");
const nodemailer = require("nodemailer");
const States =  require("../../models/user/state");
const carePostValidation = require("../../validations/user/care/carePost");

// CREATE Care USER
exports.care = async (req, res) => {
  try {
    const { error } = carePostValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    const {
      user_id,
      answer_id,
      firstname,
      lastname,
      state: stateId,
      email,
      skin_concern,
    } = req.body;

    const newCare = await Cares.create({
      user_id,
      answer_id,
      firstname,
      lastname,
      state: stateId,
      email,
      skin_concern,
    });

    const stateInfo = await States.findOne({ where: { id: stateId }, attributes: ["name"] });

    await sendWelcomeEmail(email, firstname, lastname, stateInfo.name, skin_concern, newCare, res);

  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

async function sendWelcomeEmail(email, firstname, lastname, state, skin_concern, newCare, res) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.CONTACT_HOST ,
      port: process.env.CONTACT_PORT,
      secure: true,
      auth: {
        user: process.env.CONTACT_ADDRESS,
        pass: process.env.CONTACT_PASS,
      },
    });

    const mailOptions = {
      from: process.env.CONTACT_ADDRESS,
      to: process.env.CONTACT_ADDRESS,
      subject: 'Contact for Cares in 48/72 hours',
      text: `User Info : \n    Email : ${email} \n    Name : ${firstname} ${lastname} \n    State : ${state} \n    Skin Concern : ${skin_concern}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: error });
      } else {
        return res.status(200).json({
          message: "Care details submitted successfully",
          data: newCare,
        });
      }
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
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
}
