const con = require("../../database/connection");
const Products = require("../../models/user/products");
const Products_Types = require("../../models/user/productTypes");
const RoutineNotes = require("../../models/user/routineNotes");
const Routines = require("../../models/user/routines");
const Treatments = require("../../models/user/treatments");
const userSkinCareRoutineProducts = require("../../models/user/userSkinCareRoutineProducts");
const userSkinCareRoutineTreatments = require("../../models/user/userSkinCareRoutineTreatments");
const routinePostValidation = require("../../validations/user/routines/routinePost");
const routinePutValidation = require("../../validations/user/routines/routinePut");

// FOR Routines
exports.routines = async (req, res) => {
  try {
    const { error } = routinePostValidation(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    let { user_id, timeframe, products, treatments } = req.body;

    const routine = await Routines.create({
      user_id,
      timeframe,
    });

    const routines = await Routines.findAll();
    const routineId = routines[routines.length - 1].id;

    const routinesProduct = await Promise.all(
      products.map(async (result) => {
        const createProduct = await userSkinCareRoutineProducts.create({
          user_skin_care_routine_id: routineId,
          user_product_id: result,
        });
        return createProduct;
      })
    );

    const routinesTreatment = await Promise.all(
      treatments.map(async (result) => {
        const createTreatment = await userSkinCareRoutineTreatments.create({
          user_skin_care_routine_id: routineId,
          user_facial_treatment_id: result,
        });
        return createTreatment;
      })
    );

    const responseObject = {
      user_id,
      timeframe,
      product: routinesProduct,
      treatment: routinesTreatment,
    };
    return res.status(201).json({
      message: "Routines added successfully",
      data: responseObject,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).send(err.message);
  }
};

//GET BY USER ID
exports.getByUserIdRoutines = async (req, res) => {
  try {
    const userId = req.params.user_id;

    if (!/^\d+$/.test(userId)) {
      return res.status(400).json({
        message: "Invalid ID format",
      });
    }

    const routines = await Routines.findAll({
      where: {
        user_id: userId,
      },
      order: [["createdAt", "DESC"]],
    });

    const responseObject = [];

    for (const routine of routines) {
      const userSkinCareRoutineId = routine.id;

      const products = await userSkinCareRoutineProducts.findAll({
        where: {
          user_skin_care_routine_id: userSkinCareRoutineId,
        },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Products,
            as: "product",
            attributes: [
              "brand",
              "name",
              "description",
              "purchase_location",
              "image",
              "open_date",
              "product_type_id",
              "price",
              "expiration_date",
            ],
            include: [
              {
                model: Products_Types,
                as: "product_type",
                attributes: ["name", "expiration_duration_days"],
              },
            ],
          },
        ],
      });

      const treatments = await userSkinCareRoutineTreatments.findAll({
        where: {
          user_skin_care_routine_id: userSkinCareRoutineId,
        },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Treatments,
            as: "treatment",
            attributes: ["name", "description"],
          },
        ],
      });

      const routineNotes = await RoutineNotes.findAll({
        where: {
          user_skin_care_routine_id: userSkinCareRoutineId,
        }
      });

      responseObject.push({
        id: routine.id,
        user_id: routine.user_id,
        timeframe: routine.timeframe,
        products,
        treatments,
        routineNotes,
      });
    }

    return res.status(200).json({
      message: "Routines list fetched",
      data: responseObject,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

//UPDATE Routines BY ID
exports.updateByIdRoutines = async (req, res) => {
  try {
    const { error } = routinePutValidation(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const id = req.params.id;
    const updatedData = req.body;

    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        message: "Invalid ID format",
      });
    }

    const existRoutines = await Routines.findByPk(id);
    if (!existRoutines)
      return res.status(200).json({ message: "No such routines with this id", data: [] });

    const [updatedRoutineCount] = await Routines.update(updatedData, {
      where: { id: id },
    });

    if (updatedRoutineCount === 0) {
      return res.status(404).json({
        message: "Routines not found",
      });
    }

    if (req.body.products) {
      const products = req.body.products;
      await userSkinCareRoutineProducts.destroy({
        where: {
          user_skin_care_routine_id: id,
        },
      });
      for (let i = 0; i < products.length; i++) {
        const productId = products[i];

        await userSkinCareRoutineProducts.create({
          user_skin_care_routine_id: id,
          user_product_id: productId,
        });
      }
    }

    if (req.body.treatments) {
      const treatments = req.body.treatments;
      await userSkinCareRoutineTreatments.destroy({
        where: {
          user_skin_care_routine_id: id,
        },
      });
      for (let i = 0; i < treatments.length; i++) {
        const treatmentId = treatments[i];

        await userSkinCareRoutineTreatments.create({
          user_skin_care_routine_id: id,
          user_facial_treatment_id: treatmentId,
        });
      }
    }
    const routines = await Routines.findByPk(id);

    const product = await userSkinCareRoutineProducts.findAll({
      where: {
        user_skin_care_routine_id: id,
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Products,
          as: "product",
          attributes: [
            "brand",
            "name",
            "description",
            "purchase_location",
            "image",
            "open_date",
            "product_type_id",
            "price",
            "expiration_date",
          ],

          include: [
            {
              model: Products_Types,
              as: "product_type",
              attributes: ["name", "expiration_duration_days"],
            },
          ],
        },
      ],
    });

    const treatment = await userSkinCareRoutineTreatments.findAll({
      where: {
        user_skin_care_routine_id: id,
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Treatments,
          as: "treatment",
          attributes: ["name", "description"],
        },
      ],
    });


    const responseObject = {
      routines,
      product,
      treatment,
    };

    return res.status(200).json({
      message: "Routines updated successfully",
      routines: responseObject,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

//GET BY ID
exports.getByIdRoutines = async (req, res) => {
  try {
    const Id = req.params.id;

    if (!/^\d+$/.test(Id)) {
      return res.status(400).json({
        message: "Invalid ID format",
      });
    }

    const routine = await Routines.findByPk(Id);

    if (!routine) {
      return res.status(200).json({
        message: "Routine not found",
        data: []
      });
    }

    const userSkinCareRoutineId = routine.id;

    const products = await userSkinCareRoutineProducts.findAll({
      where: {
        user_skin_care_routine_id: userSkinCareRoutineId,
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Products,
          as: "product",
          attributes: [
            "brand",
            "name",
            "description",
            "purchase_location",
            "image",
            "open_date",
            "product_type_id",
            "price",
            "expiration_date",
          ],
          include: [
            {
              model: Products_Types,
              as: "product_type",
              attributes: ["name", "expiration_duration_days"],
            },
          ],
        },
      ],
    });

    const treatments = await userSkinCareRoutineTreatments.findAll({
      where: {
        user_skin_care_routine_id: userSkinCareRoutineId,
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Treatments,
          as: "treatment",
          attributes: ["name", "description"],
        },
      ],
    });

    const routineNotes = await RoutineNotes.findAll({
      where: {
        user_skin_care_routine_id: userSkinCareRoutineId,
      },
      order: [["createdAt", "DESC"]],
    });

    const responseObject = {
      id: routine.id,
      user_id: routine.user_id,
      timeframe: routine.timeframe,
      products,
      treatments,
      routineNotes,
    };

    return res.status(200).json({
      message: "Routine fetched",
      data: responseObject,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
