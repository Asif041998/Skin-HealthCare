const ProductNotes = require("../../models/user/prodNotes");
const Products = require("../../models/user/products"); 
const productNotesPostValidations = require("../../validations/user/products/productNotesPost");
const productNotesPutValidations = require("../../validations/user/products/productNotesPut");

// CREATE Product Notes
exports.productNotes = async (req, res) => {
  try {
    const { error } = productNotesPostValidations(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    const { like_note, dislike_note, user_product_id } = req.body;

    const createdNotes = await ProductNotes.create({
      like_note,
      dislike_note,
      user_product_id,
    });

    return res.status(200).json({
      message: "Product Notes added successfully",
      data: createdNotes,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};


//UPDATE Product Notes BY ID
exports.updateByIdProductNotes = async (req, res) => {
  try {
    const { error } = productNotesPutValidations(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    const Id = req.params.id;

    if (!/^\d+$/.test(Id)) {
      return res.status(400).json({
        message: "Invalid ID format",
      });
    }
    const { like_note, dislike_note, user_product_id } = req.body;

    const existingNotes = await ProductNotes.findByPk(Id);
    if (!existingNotes) {
      return res.status(200).json({ message: "Product Note not found", data: [] });
    }

    await ProductNotes.update(
      {
        like_note, dislike_note, user_product_id,
      },
      {
        where: { id: Id }
      }
    );
    const updatedNote = await ProductNotes.findByPk(Id);

    return res.status(200).json({
      message: "Product Note updated successfully",
      productNote: updatedNote
    });

  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};


// GET ALL THE SPEAKER SERIES Notes WITH SPEAKER DETAILS
exports.getAllProductNotes = async (req, res) => {
  try {
    const productNotesList = await ProductNotes.findAll({
      include: [
        {
          model: Products,
          as: "products",
          attributes: ["name", "description", "purchase_location", "open_date", "price", "image", "product_type_id", "expiration_date"],
        },
      ],
    });

    return res.status(200).json({
      message: "Product Notes list fetched",
      data: {
        productNotes: productNotesList,
      },
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// GET A SPECIFIC Product Notes BY ID
exports.getByIdProductNotes = async (req, res) => {
  try {
    const Id = req.params.id;

    if (!/^\d+$/.test(Id)) {
      return res.status(400).json({
        message: "Invalid ID format",
      });
    }
    const note = await ProductNotes.findByPk(Id, {
      include: [
        {
          model: Products,
          as: 'products',
          attributes: ["name", "description", "purchase_location", "open_date", "price", "image", "product_type_id", "expiration_date"],
        },
      ],
    });

    if (!note) {
      return res.status(200).json({ message: 'Product Note not found', data: [] });
    }

    return res.status(200).json({
      message: 'Product Note fetched successfully',
      data: note,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

//GET PRODUCT NOTES BY USER PRODUCT ID
exports.getByUserProductIdProductNotes = async (req, res) => {
  try {
    const user_product_id = req.params.user_product_id;

    if (!/^\d+$/.test(user_product_id)) {
      return res.status(400).json({
        message: "Invalid ID format",
      });
    }

    const notes = await ProductNotes.findAll({
      where: { user_product_id },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Products,
          as: 'products',
          attributes: ["name", "description", "purchase_location", "open_date", "price", "image", "product_type_id", "expiration_date"],
        },
      ],
    });

    if (!notes || notes.length === 0)
      return res.status(200).json({ message: 'Product Notes not found', data: [] });

    return res.status(200).json({
      message: 'Product Notes fetched successfully',
      data: notes,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

