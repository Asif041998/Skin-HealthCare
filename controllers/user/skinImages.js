const SkinImages = require("../../models/user/skin_images");
const skinPostValidation = require('../../validations/user/skinImages/skinPost');
const skinPutValidation = require('../../validations/user/skinImages/skinPut');
const ValidateId = require('../../services/exceptionHandling');

// ADD SKIN-IMAGES
exports.skinImages = async (req, res) => {
    try {

        // const { error } = skinPostValidation(req.body);
        // if (error)
        //     return res.status(400).send({ error: error.details[0].message });

        let { user_goal_id, image_date, image_url } = req.body;

        const exist = await SkinImages.findOne({ where: { image_url: image_url, user_goal_id: user_goal_id } });
        if (exist)
            return res.status(409).json({
                message: "Skin-image already exists",
                skinImages: []
            });

        const skinImages = await SkinImages.create({
            user_goal_id,
            image_date,
            image_url
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
        const exceptionResult = await ValidateId(id);
        if (exceptionResult)
            return res.status(400).json(exceptionResult);


        const userExist = await SkinImages.findOne({ where: { id: id } });
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


        const userExist = await SkinImages.findOne({ where: { id: id } });
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

// GET SKIN-IMAGES BY USER GOAL ID
exports.getAllSkinImagesByUserGoalId = async (req, res) => {
    try {
        const user_goal_id = req.params.user_goal_id;

        const exceptionResult = await ValidateId(user_goal_id);
        if (exceptionResult)
            return res.status(400).json(exceptionResult);

        const skinImages = await SkinImages.findAll({ where: { user_goal_id: user_goal_id } });

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
