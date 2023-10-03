const con = require("../../database/connection");
const Speakers = require("../../models/admin/speakers");
const uploads = require("../../services/uploadFile");

// CREATE THE SPEAKERS SET
exports.speakers = async (req, res) => {
  try {
    const speakerData = req.body.speakers;

    const savedSpeakers = await Promise.all(
      speakerData.map(async (speakers) => {
        const { name, qualifications, image_url } = speakers;
        const createdSpeaker = await Speakers.create({
          name,
          qualifications,
          image_url,
        });

        return createdSpeaker;
      })
    );

    return res.status(200).json({
      message: "Speakers uploaded successfully",
      data: {
        speakers: savedSpeakers,
      },
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// GET ALL THE  SPEAKERS DETAILS
exports.getAllSpeakers = async (req, res) => {
  try {
    const speakersList = await Speakers.findAll();
    return res.status(200).json({
      message: "Speakers list fetched",
      data: {
        speakers: speakersList,
      },
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

//UPDATE SPEAKER BY ID
exports.updateByIdSpeakers = async (req, res) => {
  try {
    const speakerId = req.params.id;
    const updatedData = req.body.speakers[0]; // Assuming you send the updated data in the request body
    if (!/^\d+$/.test(speakerId)) {
      return res.status(400).json({
          message: "Invalid ID format",
      });
  }
    const [updatedRowsCount] = await Speakers.update(updatedData, {
      where: { id: speakerId }
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({
        message: "Speaker not found",
      });
    }

    const updatedSpeaker = await Speakers.findByPk(speakerId);

    return res.status(200).json({
      message: "Speaker updated successfully",
      speaker: updatedSpeaker
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};


//Get by ID
exports.getByIdSpeakers = async (req, res) => {
  try {
    const speakerId = req.params.id;
    if (!/^\d+$/.test(speakerId)) {
      return res.status(400).json({
          message: "Invalid ID format",
      });
  }
    const speaker = await Speakers.findByPk(speakerId);

    if (!speaker) {
      return res.status(404).json({
        message: "Speaker not found",
      });
    }

    return res.status(200).json({
      message: "Speaker details fetched",
      data: {
        speaker: speaker,
      },
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
