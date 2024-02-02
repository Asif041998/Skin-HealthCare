const Allergies = require("../../models/user/allergies");
const allergiesPostValidation = require("../../validations/user/allergies/allergiesPost");
const allergiesPutValidation = require("../../validations/user/allergies/allergiesPut");
const { Op } = require('sequelize');

exports.allergy = async (req, res) => {
  try {
    let userId = req.user.id;
    const { error } = allergiesPostValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    let { user_id, allergen, allergic_reaction, healing_methods } = req.body;

    const existingAllergy = await Allergies.findOne({
      where: { user_id: userId, allergen }
    });

    if (existingAllergy) {
      return res.status(409).json({
        message: "Allergy with the same allergen already exists", data: []
      });
    }

    const newAllergy = await Allergies.create({
      user_id,
      allergen,
      allergic_reaction,
      healing_methods,
    });

    return res.status(201).json({
      message: "Allergy added successfully",
      newAllergy
    });

  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// GET ALL THE  ALLERGY DETAILS
exports.getAllAllergies = async (req, res) => {
  try {
    const allergies = await Allergies.findAll();
    return res.status(200).json({
      message: "Allergies list fetched",
      data: allergies,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

//UPDATE ALLERGY BY ID
exports.updateByIdAllergies = async (req, res) => {
  try {
    const { error } = allergiesPutValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    const allergyId = req.params.id;
    const userId = req.user.id;
    const updatedData = req.body;

    if (!/^\d+$/.test(allergyId)) {
      return res.status(400).json({
        message: "Invalid ID format",
      });
    }

    const existingAllergy = await Allergies.findOne({
      where: {
        id: { [Op.not]: allergyId }, 
        user_id: userId,
        allergen: updatedData.allergen,
      },
    });

    if (existingAllergy) {
      return res.status(400).json({
        message: "Allergen already exists for the user",
        data : []
      });
    }

    const [updatedRowsCount] = await Allergies.update(updatedData, {
      where: { id: allergyId },
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({
        message: "Allergy not found",
      });
    }

    const updatedAllergy = await Allergies.findByPk(allergyId);

    return res.status(200).json({
      message: "Allergy updated successfully",
      allergy: updatedAllergy,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

//Get by ID
exports.getByIdAllergy = async (req, res) => {
  try {
    const allergyId = req.params.id;


    if (!/^\d+$/.test(allergyId)) {
      return res.status(400).json({
        message: "Invalid ID format",
      });
    }

    const allergy = await Allergies.findByPk(allergyId,
      { attributes: { exclude: ['id'] } });

    if (!allergy) {
      return res.status(200).json({
        message: "Allergy not found", data: []
      });
    }

    return res.status(200).json({
      message: "Allergy details fetched",
      allergy: allergy,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

//Get by user_id
exports.getByUserIdAllergy = async (req, res) => {
  try {
    const userId = req.user.id;

    if (req.user.id == userId) {

      const allergy = await Allergies.findAll({
        where: { user_id: userId },
        attributes: { exclude: ['user_id'] }
      });

      if (!allergy) {
        return res.status(200).json({
          message: "Allergies not found", data: []
        });
      }

      return res.status(200).json({
        message: "Allergies details fetched",
        data: allergy,
      });
    }
    else
      return res.status(403).json({ "message": "Forbidden" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};