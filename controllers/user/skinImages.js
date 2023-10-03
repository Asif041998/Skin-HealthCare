const SkinImages = require("../../models/user/skin_images");
const skinPostValidation = require('../../validations/user/skinImages/skinPost');
const skinPutValidation = require('../../validations/user/skinImages/skinPut');
const ValidateId = require('../../services/exceptionHandling');

// ADD SKIN-IMAGES
exports.skinImages = async (req, res) => {
    try {

        const { error } = skinPostValidation(req.body);
        if (error)
            return res.status(400).send({ error: error.details[0].message });

        let { user_id, date, file_name, goal_type } = req.body;

        const exist = await SkinImages.findOne({ where: { file_name: file_name } });
        if (exist)
            return res.status(409).json({
                message: "Skin-image already exists",
                skinImages: []
            });

        const skinImages = await SkinImages.create({
            user_id,
            date,
            file_name,
            goal_type
        });

        return res.status(201).json({
            message: "Skin-images added successfully",
            skinImages
        });

    } catch (err) {
        console.log(err.message)
        return res.status(400).send(err.message);
    }
};

// GET ALL THE  SKIN-IMAGES DETAILS
exports.getAllSkinImages = async (req, res) => {
    try {
        const skinImages = await SkinImages.findAll();
        return res.status(200).json({
            message: "Skin-images list fetched",
            data: skinImages,
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// UPDATE SKIN-IMAGES BY ID
exports.updateSkinImages = async (req, res) => {
    try {

        const { error } = skinPutValidation(req.body);
        if (error)
            return res.status(400).send({ error: error.details[0].message });

        const id = req.params.id;
        const updatedData = req.body;
        const userId = req.user.id;
        const exceptionResult = await ValidateId(id);
        if (exceptionResult)
            return res.status(400).json(exceptionResult);


        const userExist = await SkinImages.findOne({ where: { user_id: userId, id: id } });
        if (!userExist) return res.status(200).json({ message: "There is no skin images with this id", data: [] });

        const [updatedRowsCount] = await SkinImages.update(updatedData, {
            where: { id: id },
        });

        if (updatedRowsCount === 0)
            return res.status(200).json({
                message: "Skin-images not found",
                data: []
            });

        const updatedSkinImage = await SkinImages.findByPk(id);

        return res.status(200).json({
            message: "Skin-image updated successfully",
            data: updatedSkinImage,
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// GET SKIN-IMAGES BY ID
exports.getAllSkinImagesById = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user.id;

        const exceptionResult = await ValidateId(id);
        if (exceptionResult)
            return res.status(400).json(exceptionResult);


        const userExist = await SkinImages.findOne({ where: { user_id: userId, id: id } });
        if (!userExist)
            return res.status(200).json({ message: "No user found with this id", data: [] });

        return res.status(200).json({
            message: "Skin-images details fetched",
            data: userExist
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// GET SKIN-IMAGES BY GOAL TYPE
exports.getAllSkinImagesByUserIdAndGoalType = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const goalType = req.params.goal_type;

        const exceptionResult = await ValidateId(user_id);
        if (exceptionResult)
            return res.status(400).json(exceptionResult);

        if (goalType !== '2' && goalType !== '1')
            return res.status(400).json({ message: "Goal type can be 1 or 2 only" });

        const skinImages = await SkinImages.findAll({ where: { user_id: user_id, goal_type: goalType } });

        if (skinImages.length === 0)
            return res.status(200).json({
                message: "Skin-images not found",
                data: []
            });

        return res.status(200).json({
            message: "Skin-images details fetched",
            data: skinImages
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// GET SKIN-IMAGES BY USER_ID
exports.getAllSkinImagesByUserId = async (req, res) => {
    try {
        const userParamsId = req.params.user_id;
        const userId = req.user.id;

        const exceptionResult = await ValidateId(userId);
        if (exceptionResult)
            return res.status(400).json(exceptionResult);

        if (userId == userParamsId) {

            const skinImages = await SkinImages.findAll({ where: { user_id: userParamsId } });

            if (skinImages.length === 0) {
                return res.status(200).json({
                    message: "Skin-images not found",
                    data: { "years": [] }
                });
            }

            const organizedImages = {};
            skinImages.forEach((image) => {
                const date = new Date(image.date);
                const year = date.getFullYear();
                const month = date.toLocaleString('default', { month: 'long' });

                if (!organizedImages[year]) {
                    organizedImages[year] = {};
                }

                if (!organizedImages[year][month]) {
                    organizedImages[year][month] = [];
                }

                organizedImages[year][month].push(image.file_name);
            });

            const response = {
                years: Object.keys(organizedImages).map((year) => ({
                    year: parseInt(year),
                    months: Object.keys(organizedImages[year]).map((month) => ({
                        month,
                        data: {
                            images: organizedImages[year][month],
                        },
                    })),
                })),
            };

            return res.status(200).json({
                message: "Skin-images details fetched",
                data: response
            });
        } else {
            return res.status(200).json({
                message: "No Skin-images found with this user id",
                data: { "years": [] }
            });
        }
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};
