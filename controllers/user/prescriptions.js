const Prescriptions = require("../../models/user/prescriptions");
const prescriptionsPostValidation = require("../../validations/user/prescriptions/prescriptionsPost");
const prescriptionsPutValidation = require("../../validations/user/prescriptions/prescriptionsPut");

// FOR prescriptions
exports.prescriptions = async (req, res) => {
  try {

    const { error } = prescriptionsPostValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    let { user_id, provider, reason, diagnosis, visit_date, status } = req.body;

    const newPrescriptions = await Prescriptions.create({
      user_id,
      provider,
      reason,
      diagnosis,
      visit_date,
      status,
    });

    return res.status(201).json({
      message: "Prescription added successfully",
      prescriptions: newPrescriptions
    });

  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// GET ALL THE  PRESCRIPTIONS DETAILS
exports.getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescriptions.findAll();
    return res.status(200).json({
      message: "Prescriptions list fetched",
      data: prescriptions,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

//UPDATE PRESCRIPTIONS BY ID
exports.updateByIdPrescriptions = async (req, res) => {
  try {

    const { error } = prescriptionsPutValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    const prescriptionId = req.params.id;
    const updatedData = req.body;

    if (!/^\d+$/.test(prescriptionId)) {
      return res.status(400).json({
        message: "Invalid ID format",
      });
    }

    const [updatedRowsCount] = await Prescriptions.update(updatedData, {
      where: { id: prescriptionId },
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({
        message: "Prescriptions not found",
      });
    }

    const updatedPrescriptions = await Prescriptions.findByPk(prescriptionId);

    return res.status(200).json({
      message: "Prescriptions updated successfully",
      prescriptions : updatedPrescriptions,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

//Get by ID
exports.getByIdPrescriptions = async (req, res) => {
  try {
    const prescriptionId = req.params.id;

    if (!/^\d+$/.test(prescriptionId)) {
      return res.status(400).json({
        message: "Invalid ID format",
      });
    }

    const prescriptions = await Prescriptions.findByPk(prescriptionId,
      { attributes: { exclude: ['id'] }});

    if (!prescriptions) {
      return res.status(200).json({
        message: "Prescriptions not found",
        data: []
      });
    }

    return res.status(200).json({
      message: "Prescriptions details fetched",
      prescriptions : prescriptions,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

//Find by user_id
exports.getByUserIdPrescriptions = async (req, res) => {
  try {
    const userId = req.user.id;

    if (req.user.id == userId) {

    // Assuming you have a model called Users to query for user details
    const prescription = await Prescriptions.findAll( {where : { user_id : userId},
       attributes: { exclude: ['user_id'] }});

    if (!prescription) {
      return res.status(200).json({
        message: "Prescriptions not found", data:[]
      });
    }

    return res.status(200).json({
      message: "Prescriptions details fetched",
      data : prescription,
    });
  }
  else
    return res.status(403).json({"message" : "Forbidden"});
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};