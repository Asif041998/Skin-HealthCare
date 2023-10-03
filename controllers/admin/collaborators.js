const { col } = require('sequelize');
const Collaborator = require('../../models/admin/collaborators');
const ValidateId = require('../../services/exceptionHandling');
const collaboratorPostValidation = require('../../validations/admin/collaborators/collaboratorsPostValidation');
const collaboratorPutValidation = require('../../validations/admin/collaborators/collaboratorsPutvalidation');

// CREATE COLLABORATORS
exports.createCollaborators = async (req, res) => {
    try {

        const { error } = collaboratorPostValidation(req.body);
        if (error) {
            return res.status(400).send({ error: error.details[0].message });
        }

        const { title, join_year, about, participation_reason, learning_outcome, video_url, web_url, image_url } = req.body;

        const createdCollaborator = await Collaborator.create({
            title,
            join_year,
            about,
            participation_reason,
            learning_outcome,
            video_url,
            web_url,
            image_url
        });

        return res.status(200).json({
            message: "Collaborators created successfully",
            data: createdCollaborator,
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

//UPDATE COLLABORATOR BY ID
exports.updateCollaborators = async (req, res) => {
    try {
        const { error } = collaboratorPutValidation(req.body);
        if (error) {
            return res.status(400).send({ error: error.details[0].message });
        }
        const id = req.params.id;
        const exceptionResult = await ValidateId(id);
        if (exceptionResult)
            return res.status(400).json(exceptionResult);

        const updatedData = req.body;

        const existingCollaborator = await Collaborator.findByPk(id);
        if (!existingCollaborator) {
            return res.status(200).json({ message: "Collaborator not found", data: [] });
        }

        const [updatedRowsCount] = await Collaborator.update(updatedData, {
            where: { id: id },
        });

        if (updatedRowsCount === 0) {
            return res.status(404).json({
                message: "Collaborator not found",
            });
        }
        const updatedCollaborator = await Collaborator.findByPk(id);

        return res.status(200).json({
            message: "Collaborators updated successfully",
            collaborator: updatedCollaborator
        });

    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// GET ALL THE COLLABORATORS DETAILS
exports.getAllTheCollaborators = async (req, res) => {
    try {

        const CollaboratorList = await Collaborator.findAll();

        if (CollaboratorList.length === 0) {
            return res.status(200).json({
                message: "No data found",
                data: []
            });
        }
        return res.status(200).json({
            message: "Collaborators list fetched",
            data: CollaboratorList
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// GET A SPECIFIC COLLABORATORS BY ID
exports.getCollaboratorsById = async (req, res) => {
    try {
        const id = req.params.id;
        const exceptionResult = await ValidateId(id);
        if (exceptionResult)
            return res.status(400).json(exceptionResult);

        const collaborator = await Collaborator.findByPk(id);

        if (!collaborator) {
            return res.status(200).json({ message: 'Collaborator not found', data: [] });
        }

        return res.status(200).json({
            message: 'Collaborator fetched successfully',
            data: collaborator,
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// DELETE A SPECIFIC COLLABORATORS BY ID
exports.deleteCollaborators = async (req, res) => {
    try {
        const id = req.params.id;
        const exceptionResult = await ValidateId(id);
        if (exceptionResult)
            return res.status(400).json(exceptionResult);

        const collaborator = await Collaborator.findByPk(id);

        if (!collaborator) {
            return res.status(200).json({ message: 'Collaborator not found', data: [] });
        }
        await collaborator.destroy();

        return res.status(200).json({
            message: 'Collaborator deleted successfully',
            data: [],
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

