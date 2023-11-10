const con = require("../../database/connection");
const SkincareSuggestion = require("../../models/admin/skincareSuggestion");
const skincareSuggestionPostValidations = require("../../validations/admin/skincareSuggestions/post");
const skincareSuggestionPutValidations = require("../../validations/admin/skincareSuggestions/put");
const ValidateId = require('../../services/exceptionHandling');

//POST SKINCARE SUGGESTIONS 
exports.skincareSuggestion = async (req, res) => {
  try {
    let userId = req.user.id;
    const { error } = skincareSuggestionPostValidations(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    let { name, image_url, suggestion_type, price, description, quantity } = req.body;

    if (suggestion_type === "Product") {
      // if (!price || !quantity) {
      //   return res.status(400).json({ message: "Price and quantity are required for product suggestions." });
      // }
    } else if (suggestion_type === "Treatment") {
      price = null;
      quantity = null;
    }

    const newSkincareSuggestion = await SkincareSuggestion.create({
      name,
      image_url,
      suggestion_type,
      price,
      description,
      quantity,
    });

    return res.status(201).json({
      message: "Skincare Suggestion added successfully",
      newSkincareSuggestion
    });

  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

// GET Skincare Suggestion by type
exports.getSkincareSuggestionByType = async (req, res) => {
  try {
    const { suggestionType, page, limit } = req.query;
    const pageInt = parseInt(page) || 1;
    const limitInt = parseInt(limit) || 10;

    if (!suggestionType) {
      return res.status(200).json({ message: 'Please provide a suggestion type (product/treatment).', data: [] });
    }

    const skincareSuggestions = await SkincareSuggestion.findAndCountAll({
      where: { suggestion_type: suggestionType },
    });

    if (skincareSuggestions.count === 0) {
      return res.status(200).json({
        message: 'No skincare suggestions found for the given type.',
        skincareSuggestions: [],
      });
    }

    const offset = (pageInt - 1) * limitInt;
    const paginatedSuggestions = skincareSuggestions.rows.slice(offset, offset + limitInt);

    return res.status(200).json({
      message: 'Skincare suggestions retrieved successfully',
      skincareSuggestions: paginatedSuggestions,
      totalCount: skincareSuggestions.count,
      currentPage: pageInt,
      totalPages: Math.ceil(skincareSuggestions.count / limitInt),
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

//GET ALL without pagination
exports.getSkincareSuggestionByType1 = async (req, res) => {
  try {
    const { suggestionType } = req.query;

    const skincareSuggestions = await SkincareSuggestion.findAll({
      where: {suggestion_type : suggestionType },
    });

    if (skincareSuggestions.length === 0) {
      return res.status(200).json({
        message: 'No skincare suggestions found for the given type.',
        data: [],
      });
    }

    return res.status(200).json({
      message: 'Skincare suggestions retrieved successfully',
      data: skincareSuggestions,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


//UPDATE SKINCARE SUGGESTIONS BY ID
  exports.updateSkincareSuggestionByType = async (req, res) => {
    try {
  
      const { error } = skincareSuggestionPutValidations(req.body);
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      }
  
      const Id = req.params.id;
      const updatedData = req.body;
  
      if (!/^\d+$/.test(Id)) {
        return res.status(400).json({
          message: "Invalid ID format",
        });
      }
  
      const [updatedRowsCount] = await SkincareSuggestion.update(updatedData, {
        where: { id: Id },
      });
  
      if (updatedRowsCount === 0) {
        return res.status(200).json({
          message: "Skincare Suggestion not found", data: []
        });
      }
  
      const updatedSkincareSuggestion = await SkincareSuggestion.findByPk(Id);
  
      return res.status(200).json({
        message: "Skincare Suggestion updated successfully",
        skincareSuggestion : updatedSkincareSuggestion,
      });
    } catch (err) {
      return res.status(400).json({ message : err.message });
    }
  };
  

  //GET by ID
  exports.getByIdSkincareSuggestion = async (req, res) => {
    try {
      const Id = req.params.id;
  
      if (!Id) {
        return res.status(400).json({ message: 'Please provide a skincare suggestion ID.' });
      }
  
      const skincareSuggestion = await SkincareSuggestion.findByPk(Id);
  
      if (!skincareSuggestion) {
        return res.status(200).json({ message: 'Skincare suggestion not found.', data: [] });
      }
  
      return res.status(200).json({
        message: 'Skincare suggestion retrieved successfully',
        skincareSuggestion,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  //DELETE API
  exports.deleteByIdSkincareSuggestion = async (req, res) => {
    try {
      const Id = req.params.id;
  
      if (!Id) {
        return res.status(400).json({ message: 'Please provide a skincare suggestion ID.' });
      }
  
      const skincareSuggestion = await SkincareSuggestion.findByPk(Id);
  
      if (!skincareSuggestion) {
        return res.status(200).json({ message: 'Skincare suggestion not found.', data: [] });
      }
  
      await skincareSuggestion.destroy();
  
      return res.status(200).json({
        message: 'Skincare suggestion deleted successfully',
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  
