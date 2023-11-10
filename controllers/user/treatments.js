const con = require("../../database/connection");
const Treatments = require("../../models/user/treatments");
const treatmentPostValidation = require("../../validations/user/treatments/treatmentsPost");
const treatmentPutValidation = require("../../validations/user/treatments/treatmentsPut");
const { Op } = require('sequelize');

// FOR Treatments
exports.treatments = async (req, res) => {
  try {
    let userId = req.user.id;
    const { error } = treatmentPostValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    let { user_id, name, description } = req.body;

    const existingTreatment = await Treatments.findOne({
      where: { user_id: userId, name }
    });

    if (existingTreatment) {
      return res.status(409).json({
        message: "Treatment with the same name already exists", data: []
      });
    }

    // Create a new treatment if it doesn't already exist
    const newTreatments = await Treatments.create({
      user_id, name, description
    });

    return res.status(201).json({
      message: "Treatment added successfully",
      treatments: newTreatments
    });
  } catch (err) {
    console.error(err.message);
    return res.status(400).send(err.message);
  }
};

// GET ALL THE  Treatments DETAILS
exports.getAllTreatments = async (req, res) => {
  try {
    const treatments = await Treatments.findAll();
    return res.status(200).json({
      message: "Treatments list fetched",
      data: treatments,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

//UPDATE Treatments BY ID
exports.updateByIdTreatments = async (req, res) => {
  try {
    const { error } = treatmentPutValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    const treatmentId = req.params.id;
    const userId = req.user.id;
    const updatedData = req.body;

    if (!/^\d+$/.test(treatmentId)) {
      return res.status(400).json({
        message: "Invalid ID format",
      });
    }

    const existingTreatment = await Treatments.findOne({
      where: {
        id: { [Op.not]: treatmentId }, 
        user_id: userId,
        name: updatedData.name,
      },
    });

    if (existingTreatment) {
      return res.status(400).json({
        message: "Treatment already exists for the user",
        data : []
      });
    }

    const [updatedRowsCount] = await Treatments.update(updatedData, {
      where: { id: treatmentId },
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({
        message: "Treatment not found",
      });
    }

    const updatedTreatments = await Treatments.findByPk(treatmentId);

    return res.status(200).json({
      message: "Treatment updated successfully",
      treatments: updatedTreatments,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};


//Get by ID
exports.getByIdTreatments = async (req, res) => {
  try {
    const treatmentId = req.params.id;

    if (!/^\d+$/.test(treatmentId)) {
      return res.status(400).json({
        message: "Invalid ID format",
      });
    }
    const treatments = await Treatments.findByPk(treatmentId,
      { attributes: { exclude: ['id'] } });

    if (!treatments) {
      return res.status(200).json({
        message: "Treatment not found",
        data: []
      });
    }

    return res.status(200).json({
      message: "Treatment details fetched",
      data: treatments,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};


//Find all treatment by user_id
exports.getByUserIdTreatments = async (req, res) => {
  try {
    const userId = req.params.user_id;

    if (req.user.id == userId) {

      // Assuming you have a model called Users to query for user details
      const treatment = await Treatments.findAll({
        where: { user_id: userId },
        attributes: { exclude: ['user_id'] }
      });

      if (!treatment) {
        return res.status(200).json({
          message: "Treatments not found", data: []
        });
      }

      return res.status(200).json({
        message: "Treatments details fetched",
        data: treatment,
      });
    }
    else
      return res.status(403).json({ "message": "Forbidden" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
