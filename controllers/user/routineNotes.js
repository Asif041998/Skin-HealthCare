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

    let { user_id, date, description } = req.body;

    const newRoutineNotes = await RoutineNotes.create({
      user_id,
      date,
      description,
    });

    return res.status(201).json({
      message: "Skincare routines notes added successfully",
      newRoutineNotes,
    });
  } catch (err) {
    return res.status(400).send(err.message);
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
        message: "Skincare routines notes not found",
      });
    }

    const updatedRoutines = await RoutineNotes.findByPk(routineId);

    return res.status(200).json({
      message: "Skincare routines notes updated successfully",
      routineNotes: updatedRoutines,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

//Get by USER ID
exports.getByUserIdRoutineNotes = async (req, res) => {
  try {
    const userId = req.user.id;

    const routines = await RoutineNotes.findAll({
      where: { user_id: userId },
      order: [['date', 'DESC']],
      attributes: { exclude: ['user_id'] }
    });

    if (!/^\d+$/.test(userId)) {
      return res.status(400).json({
        message: "Invalid ID format",
      });
    }

    if (!routines) {
      return res.status(200).json({
        message: "Skincare routines notes not found",
        data: []
      });
    }

    return res.status(200).json({
      message: "Skincare routines notes details fetched",
      data: {
        routineNotes: routines,
      },
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
