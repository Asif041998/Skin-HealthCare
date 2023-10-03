const con = require("../../database/connection");
const RoutineNotes = require("../../models/user/routineNotes");
const Routines = require("../../models/user/routines");
const routineNotesPostValidations = require("../../validations/user/routineNotes/routineNotesPost");
const routineNotesPutValidations = require("../../validations/user/routineNotes/routineNotesPut");

// FOR Routine Notes
exports.routineNotes = async (req, res) => {
  try {

    const { error } = routineNotesPostValidations(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    let { user_skin_care_routine_id, date, description } = req.body;

    const newRoutineNotes = await RoutineNotes.create({
      user_skin_care_routine_id,
      date,
      description,
    });

    return res.status(201).json({
      message: "Routines Notes added successfully",
      newRoutineNotes,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).send(err.message);
  }
};

// GET ALL THE  Routines notes DETAILS
exports.getAllRoutineNotes = async (req, res) => {
  try {
    const routines = await RoutineNotes.findAll({
      include: [
        {
          model: Routines,
          as: "routine", // This should match the alias you set in the Notes model
          attributes: ["user_id", "timeframe"],
        },
      ],
    });
    return res.status(200).json({
      message: "Routine Notes list fetched",
      data: routines,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

//UPDATE routines notes BY ID
exports.updateByIdRoutineNotes = async (req, res) => {
  try {

    const { error } = routineNotesPutValidations(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    const routineId = req.params.id;
    const updatedData = req.body;

    if (!/^\d+$/.test(routineId)) {
      return res.status(400).json({
          message: "Invalid ID format",
      });
  }

    const [updatedRowsCount] = await RoutineNotes.update(updatedData, {
      where: { id: routineId },
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({
        message: "Routine Notes not found",
      });
    }

    const updatedRoutines = await RoutineNotes.findByPk(routineId);

    return res.status(200).json({
      message: "Routine Notes updated successfully",
      routineNotes: updatedRoutines,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

//Get by ID
exports.getByIdRoutineNotes = async (req, res) => {
  try {
    const routineId = req.params.id;
    const userId = req.user.id;

    const routines = await RoutineNotes.findByPk(routineId, {
      include: [
        {
          model: Routines,
          as: "routine", // This should match the alias you set in the Notes model
          attributes: ["user_id", "timeframe"],
        },
      ],
    });

    if (!/^\d+$/.test(routineId)) {
      return res.status(400).json({
          message: "Invalid ID format",
      });
  }

    if (!routines) {
      return res.status(200).json({
        message: "Routine Notes not found",
        data:[]
      });
    }

    return res.status(200).json({
      message: "Routine Notes details fetched",
      data: {
        routineNotes: routines,
      },
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};


//Get by USER ID
exports.getByUserIdRoutineNotes = async (req, res) => {
  try {
    const userId = req.user.id;

    const routines = await RoutineNotes.findByPk(userId, {
      include: [
        {
          model: Routines,
          as: "routine", // This should match the alias you set in the Notes model
          attributes: ["user_id", "timeframe"],
        },
      ],
    });

    if (!/^\d+$/.test(userId)) {
      return res.status(400).json({
          message: "Invalid ID format",
      });
  }

    if (!routines) {
      return res.status(200).json({
        message: "Routine Notes not found",
        data:[]
      });
    }

    return res.status(200).json({
      message: "Routine Notes details fetched",
      data: {
        routineNotes: routines,
      },
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};


//GET BY USER SKIN CARE ROUTINE ID
exports.getByUserSkinCareIdRoutineNotes = async (req, res) => {
  try {
    const routineId = req.params.user_skin_care_routine_id;

    // Check if routineId is a valid positive integer
    if (!/^\d+$/.test(routineId)) {
      return res.status(400).json({
        message: "Invalid ID format",
      });
    }

    const routines = await RoutineNotes.findAll({
      where: { user_skin_care_routine_id: routineId }, // Fix the 'where' condition
      include: [
        {
          model: Routines,
          as: "routine", // This should match the alias you set in the Notes model
          attributes: ["user_id", "timeframe"],
        },
      ],
    });

    if (!routines || routines.length === 0) {
      return res.status(200).json({
        message: "Routine Notes not found",
        data:[]
      });
    }

    return res.status(200).json({
      message: "Routine Notes details fetched",
      data: {
        routineNotes: routines,
      },
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
