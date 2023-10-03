const con = require("../../database/connection");
const Events = require("../../models/admin/events");
const Speakers = require("../../models/admin/speakers"); // Import the Speakers model
const officeHoursValidationsPost = require("../../validations/admin/officeHours/officeHoursPost")
const officeHoursValidationsPut = require("../../validations/admin/officeHours/officeHoursPut")

// CREATE OFFICE-HOURS
exports.officeHours = async (req, res) => {
  try {

    const { error } = officeHoursValidationsPost(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    const {
      program_id,
      title,
      description,
      event_date,
      image_url,
      content_url,
      status,
      speaker_id,
    } = req.body;

    // Create the event
    const createdEvent = await Events.create({
      program_id: program_id,
      title: title,
      description: description,
      image_url,
      content_url,
      event_date: event_date,
      status: status,
      speaker_id: speaker_id,
    });

    return res.status(200).json({
      message: "Office Hours uploaded successfully",
      data: createdEvent,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.updateOfficeHours = async (req, res) => {
  try {
    const { error } = officeHoursValidationsPut(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    const eventId = req.params.id;
    if (!/^\d+$/.test(eventId)) {
      return res.status(400).json({
        message: "Invalid ID format",
      });
    }
    const { program_id, title, description, event_date, image_url, content_url, status, speaker_id } = req.body;

    const existingEvent = await Events.findByPk(eventId);
    if (!existingEvent) {
      return res.status(404).json({ error: "Office-hours event not found" });
    }

    const programId = existingEvent.dataValues.program_id;
    if (programId === 4) {
      await Events.update(
        {
          program_id, title, description, event_date, image_url, content_url, status, speaker_id,
        },
        {
          where: { id: eventId }
        }
      );
      const updatedEvent = await Events.findByPk(eventId);

      return res.status(200).json({
        message: "Office-hours  event updated successfully",
        officeHours: updatedEvent
      });
    }
    else {
      return res
        .status(404)
        .json({ message: `Office-hours event not found for id = ${eventId}` });
    }

  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// GET ALL THE OFFICE-HOURS EVENTS WITH SPEAKER DETAILS
exports.getAllOfficeHours = async (req, res) => {
  try {
    // Use Sequelize to perform a JOIN operation to get speaker details
    const speakerSeriesList = await Events.findAll({
      include: [
        {
          model: Speakers,
          as: "speaker", // This should match the alias you set in the Events model
          attributes: ["name", "qualifications", "image_url"],
        },
      ],
    });

    return res.status(200).json({
      message: "Office Hours list fetched",
      data: {
        speakerSeries: speakerSeriesList,
      },
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};


// GET A SPECIFIC OFFICE-HOURS EVENT BY PROGRAM ID
exports.getByProgramIdOfficeHours = async (req, res) => {
  try {
    const programId = req.params.program_id; // Use 'programId' to match the parameter in the route definition
    if (!/^\d+$/.test(programId)) {
      return res.status(400).json({
        message: "Invalid ID format",
      });
    }
    if (programId == 4) {
      const event = await Events.findAll({
        where: { program_id: programId }, // Filter by program_id
        include: [
          {
            model: Speakers,
            as: 'speaker',
            attributes: ['name', 'qualifications', 'image_url'],
          },
        ],
      });

      if (event.length === 0) {
        return res.status(404).json({ message: 'Office Hours event not found' });
      }

      return res.status(200).json({
        message: 'Office Hours event fetched successfully',
        data: event,
      });
    }
    else{
      return res.status(404).json({ message: "There is no office hours event with this program id" });
    }

  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};


// GET A SPECIFIC OFFICE-HOURS EVENT BY ID
exports.getByIdOfficeHours = async (req, res) => {
  try {
    const eventId = req.params.id; // Use 'eventId' to match the parameter in the route definition
    if (!/^\d+$/.test(eventId)) {
      return res.status(400).json({
        message: "Invalid ID format",
      });
    }
    // Use Sequelize to find the event by its ID and include speaker details
    const event = await Events.findByPk(eventId, {
      include: [
        {
          model: Speakers,
          as: 'speaker',
          attributes: ['name', 'qualifications', 'image_url'],
        },
      ],
    });

    if (!event) {
      return res.status(404).json({ message: 'Office Hours event not found' });
    }

    return res.status(200).json({
      message: 'Office Hours event fetched successfully',
      data: event,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};