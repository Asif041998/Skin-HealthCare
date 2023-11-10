const con = require("../../database/connection");
const SkinAnalysis = require("../../models/user/skinAnalysis");
const skinAnalysisPostValidation = require("../../validations/user/skinAnalysis/post");
const { Op } = require('sequelize');


exports.skinAnalysis = async (req, res) => {
  try {
    let userId = req.user.id;
    const { error } = skinAnalysisPostValidation(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    let { user_id, image_url, dark_spots, face_wrinkles, redness, hydration, skin_health, texture } = req.body;

    const newSkinAnalysis = await SkinAnalysis.create({
      user_id,
      image_url,
      dark_spots,
      face_wrinkles,
      redness,
      hydration,
      skin_health,
      texture,
    });

    return res.status(201).json({
      message: "Skin Health Analysis added successfully",
      newSkinAnalysis
    });

  } catch (err) {
    return res.status(400).send(err.message);
  }
};

//GET SKIN HEALTH ANALYSIS BY USER ID
exports.getAllSkinAnalysisByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const { timeInterval } = req.query;

    let whereClause = { user_id: userId };
    if (timeInterval) {
      const timeIntervals = {
        'oneDay': { [Op.gte]: new Date(new Date() - 24 * 60 * 60 * 1000) },
        'oneWeek': { [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000) },
        'oneMonth': { [Op.gte]: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) },
        'threeMonths': { [Op.gte]: new Date(new Date() - 90 * 24 * 60 * 60 * 1000) },
        'sixMonths': { [Op.gte]: new Date(new Date() - 180 * 24 * 60 * 60 * 1000) }
      };

      if (!timeIntervals[timeInterval]) {
        return res.status(400).json({
          message: "Invalid time interval provided",
          data: []
        });
      }

      const skinAnalysis = await SkinAnalysis.findAll({
        where: {
          user_id: userId,
          createdAt: timeIntervals[timeInterval],
        },
        attributes: { exclude: ['user_id'] },
      });


      if (!skinAnalysis || skinAnalysis.length === 0) {
        return res.status(200).json({
          message: "No Skin Health Analysis found for the specified time interval",
          data: []
        });
      }

      return res.status(200).json({
        message: "Skin Health Analysis details fetched",
        data: skinAnalysis,
      });
    }
    else {
      const skinAnalysis = await SkinAnalysis.findAll({
        where: whereClause,
        attributes: { exclude: ['user_id'] },
        order: [['createdAt', 'DESC']],
        limit: 1
      });

      if (!skinAnalysis || skinAnalysis.length === 0) {
        return res.status(200).json({
          message: "No Skin Health Analysis found for the specified time interval",
          data: []
        });
      }

      return res.status(200).json({
        message: "Skin Health Analysis details fetched",
        data: skinAnalysis,
      });
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};


