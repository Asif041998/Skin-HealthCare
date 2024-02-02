const Meditation = require("../../models/admin/meditation");
const ValidateId = require('../../services/exceptionHandling');
const meditationValidationsPut = require('../../validations/admin/meditations/meditationPut');
const meditationValidationsPost = require('../../validations/admin/meditations/meditationPost');
const Events = require('../../models/admin/events');

// POST FOR MEDITATION EVENT
exports.meditation = async (req, res) => {
    try {
        const meditation = req.body.meditation_files;

        const meditationFileUrls = await Promise.all(meditation.map(async (file) => {
            const { error } = meditationValidationsPost(file);
            if (error) {
                return res.status(400).send({ error: error.details[0].message });
            }
            const { program_id, title, description, image_url, file_type, content_url, status } = file;


            const createdMeditation = await Meditation.create({
                program_id,
                title,
                description,
                image_url,
                file_type,
                content_url,
                status
            });
            return createdMeditation;
        }));

        return res.status(200).json({
            message: 'Meditation uploaded successfully',
            meditation_files: meditationFileUrls,
        });

    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// GET ALL THE MEDITATIONS DETAILS BY PROGRAM ID
exports.getAllMeditations = async (req, res) => {
    try {

        const programId = req.params.program_id;
        const exceptionResult = await ValidateId(programId);
        if (exceptionResult)
            return res.status(400).json(exceptionResult);

        if (programId == 2) {
            const meditationList = await Meditation.findAll({ where: { program_id: programId } });

            if (meditationList.length === 0) {
                return res.status(404).json({ message: "No records found" });
            }

            return res.status(200).json({
                message: 'Meditation list fetched',
                data: {
                    meditation: meditationList,
                },
            });
        }
        else {
            return res.status(404).json({ message: "There is no meditation event with this program id",});
        }

    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

//GET BY ID
exports.getByIdMeditations = async (req, res) => {
    try {
        const eventId = req.params.id;

        const exceptionResult = await ValidateId(eventId);
        if (exceptionResult)
            return res.status(400).json(exceptionResult);

        const event = await Events.findByPk(eventId, { where: { id: eventId } });
        if (!event) {
            return res.status(404).json({ error: `Meditations event not found for id = ${eventId}`});
        }
        const programId = event.dataValues.program_id;
        if (programId === 2) {

            return res.status(200).json({
                message: "Meditations event fetched successfully",
                data: event,
            });
        } else {
            return res
                .status(200)
                .json({ message: `Meditations event not found for id = ${eventId}`, data: [] });
        }
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

//UPDATE MEDITATION BY ID
exports.updateMeditations = async (req, res) => {

    try {
        const { error } = meditationValidationsPut(req.body);
        if (error) {
            return res.status(400).send({ error: error.details[0].message });
        }
        const eventId = req.params.id;
        const exceptionResult = await ValidateId(eventId);
        if (exceptionResult)
            return res.status(400).json(exceptionResult);

        const {
            program_id, title, description, image_url, file_type, content_url, event_date, status
        } = req.body;

        const existingEvent = await Events.findByPk(eventId);
        if (!existingEvent) {
            return res.status(404).json({ message: "Meditation event not found", });
        }
        const programId = existingEvent.dataValues.program_id;
        if (programId === 2) {
            await Events.update(
                {
                    program_id, title, description, image_url, file_type, content_url, event_date, status
                },
                {
                    where: { id: eventId }
                }
            );
            const updatedEvent = await Events.findByPk(eventId);

            return res.status(200).json({
                message: "Meditation event updated successfully",
                meditation: updatedEvent
            });
        }
        else {
            return res
                .status(200)
                .json({ message: `Meditations event not found for id = ${eventId}`, data: [] });
        }

    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};