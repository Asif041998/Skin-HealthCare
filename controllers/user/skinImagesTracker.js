const SkinImagestracker = require("../../models/user/skinImagesTracker");
const skinTrackerPostValidation = require('../../validations/user/skinImagesTracker/skinTrackerPost');
const skinTrackerPutValidation = require('../../validations/user/skinImagesTracker/skinTrackerPut');
const ValidateId = require('../../services/exceptionHandling');

// ADD SKIN-IMAGES
exports.skinImagesTracker = async (req, res) => {
    try {

        const { error } = skinTrackerPostValidation(req.body);
        if (error)
            return res.status(400).send({ error: error.details[0].message });

        let userId = req.user.id;
        let { user_id, image_date, file_name } = req.body;

        const exist = await SkinImagestracker.findOne({ where: { file_name: file_name, user_id: userId } });
        if (exist)
            return res.status(409).json({
                message: "Skin-image tracker already exists",
            });

        const skinImagesTracker = await SkinImagestracker.create({
            user_id,
            image_date,
            file_name,
        });

        return res.status(201).json({
            message: "Skin image added successfully",
            skinImagesTracker
        });

    } catch (err) {
        console.log(err.message)
        return res.status(400).send(err.message);
    }
};

// GET ALL THE  SKIN-IMAGES DETAILS
exports.getAllSkinImages = async (req, res) => {
    try {
        const skinImages = await SkinImagestracker.findAll({ order: [['createdAt', 'DESC']] });
        return res.status(200).json({
            message: "Skin-images list fetched",
            data: skinImages,
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// UPDATE SKIN-IMAGES BY ID
exports.updateSkinImagesTracker = async (req, res) => {
    try {

        const { error } = skinTrackerPutValidation(req.body);
        if (error)
            return res.status(400).send({ error: error.details[0].message });

        const id = req.params.id;
        const updatedData = req.body;
        const userId = req.user.id;
        const exceptionResult = await ValidateId(id);
        if (exceptionResult)
            return res.status(400).json(exceptionResult);


        const userExist = await SkinImagestracker.findOne({ where: { user_id: userId, id: id } });
        if (!userExist) return res.status(200).json({ message: "There is no skin images tracker with this id", data: [] });

        const [updatedRowsCount] = await SkinImagestracker.update(updatedData, {
            where: { id: id },
        });

        if (updatedRowsCount === 0)
            return res.status(200).json({
                message: "Skin-images tracker not found",
                data: []
            });

        const updatedSkinImage = await SkinImagestracker.findByPk(id);

        return res.status(200).json({
            message: "Skin image edited successfully",
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


        const userExist = await SkinImagestracker.findOne({ where: { user_id: userId, id: id } });
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

// GET SKIN-IMAGES BY USER_ID
exports.getAllSkinImagesByUserId = async (req, res) => {
    try {
        const userParamsId = req.params.user_id;
        const userId = req.user.id;
         
        const exceptionResult = await ValidateId(userId);
        if (exceptionResult)
            return res.status(400).json(exceptionResult);

        if (userId == userParamsId) {
            const skinImages = await SkinImagestracker.findAll({
                where: { user_id: userParamsId },
            });

            if (skinImages.length === 0) {
                return res.status(200).json({
                    message: "Skin-images not found",
                    data: { "years": [] }
                });
            }

            const organizedImages = {};
            skinImages.forEach((image) => {
                const date = new Date(image.image_date);
                const year = date.getFullYear();
                const month = date.toLocaleString('default', { month: 'long' });

                if (!organizedImages[year]) {
                    organizedImages[year] = {};
                }

                if (!organizedImages[year][month]) {
                    organizedImages[year][month] = [];
                }

                organizedImages[year][month].push({
                    file_name: image.file_name,
                    image_date: date,
                });
            });

            const response = {
                years: Object.keys(organizedImages).map((year) => ({
                    year: parseInt(year),
                    months: Object.keys(organizedImages[year])
                        .sort((a, b) => new Date(b + ' 1, 2000') - new Date(a + ' 1, 2000'))
                        .map((month) => ({
                            month,
                            data: {
                                images: organizedImages[year][month]
                                    .sort((a, b) => b.image_date - a.image_date)
                                    .map((image) => image.file_name),
                            },
                        })),
                })),
            };

            response.years.sort((a, b) => b.year - a.year);

            return res.status(200).json({
                message: "Skin-images tracker details fetched",
                data: response
            });
        } else {
            return res.status(200).json({
                message: "No Skin-images tracker found with this user id",
                data: { "years": [] }
            });
        }
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

