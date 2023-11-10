const { version } = require('joi');
const Updates = require('../../models/admin/updates');
const updatesValidationsPost = require('../../validations/admin/updates/updatesPost');
const ValidateId = require('../../services/exceptionHandling');
const { and } = require('sequelize');

// CREATE UPDATES
exports.createUpdates = async (req, res) => {
    try {

        const { error } = updatesValidationsPost(req.body);
        if (error)
            return res.status(400).json({ error: error.details[0].message });

        const { os_type, version, date } = req.body;
        const updateExist = await Updates.findOne({ where: { os_type: os_type, version: version } });
        if (updateExist)
            return res.status(409).json({ message: "Update already exists" });

        const updates = await Updates.create({
            os_type,
            version,
            date
        });

        return res.status(201).json({
            message: "Updates created successfully",
            data: updates
        })

    }
    catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

// GET ALL THE UPDATES BY PLATFORM
exports.getAllUpdatesByPlatfrom = async (req, res) => {
    try {
        const type = req.params.os_type;
        if (type !== 'Android' && type !== 'IOS' && type !== 'Both')
            return res.status(400).json({ message: " Invalid platform, platform type can be Android, IOS or Both. " });

        const updateList = await Updates.findAll({ where: { os_type: type }, order: [['createdAt', 'DESC']], });

        if (updateList.length === 0)
            return res.status(200).json({
                message: "No data found",
                data: []
            });

        return res.status(200).json({
            message: "Updates list fetched",
            data: updateList
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// GET THE UPDATES BY ID
exports.getUpdatesById = async (req, res) => {
    try {
        const id = req.params.id;
        const exceptionResult = await ValidateId(id);
        if (exceptionResult)
            return res.status(400).json(exceptionResult);

        const updates = await Updates.findByPk(id);

        if (!updates) {
            return res.status(200).json({ message: 'Updates not found', data: [] });
        }

        return res.status(200).json({
            message: 'Updates fetched successfully',
            data: updates,
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// GET ALL THE UPDATES 
exports.getAllTheUpdates = async (req, res) => {
    try {

        const updates = await Updates.findAll();

        if (updates.length === 0)
            return res.status(200).json({ message: 'Updates not found', data: [] });

        return res.status(200).json({
            message: 'Updates fetched successfully',
            data: updates,
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// DELETE A SPECIFIC UPDATES BY ID
exports.deleteUpdates = async (req, res) => {
    try {
        const id = req.params.id;
        const exceptionResult = await ValidateId(id);
        if (exceptionResult)
            return res.status(400).json(exceptionResult);

        const updates = await Updates.findByPk(id);

        if (!updates) {
            return res.status(200).json({ message: 'Updates not found', data: [] });
        }
        await updates.destroy();

        return res.status(200).json({
            message: 'Updates deleted successfully',
            data: [],
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

