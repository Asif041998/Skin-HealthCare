const { promises } = require("fs");
const Goals = require("../../models/user/goals");
const GoalsPrescriptions = require('../../models/user/userGoalsPrescriptions');
const GoalsTreatments = require('../../models/user/userGoalsTreatments');
const GoalsProducts = require('../../models/user/userGoalsProducts');
const Prescription = require('../../models/user/prescriptions');
const Product = require('../../models/user/products');
const Treatment = require('../../models/user/treatments');
const Products_Types = require('../../models/user/productTypes');
const SkinImages = require('../../models/user/skin_images');
const ValidateId = require('../../services/exceptionHandling');
const goalPostValidation = require('../../validations/user/goals/goalsPost');
const goalPutValidation = require('../../validations/user/goals/goalsPut');
const { where } = require("sequelize");

// ADD GOALS
exports.goals = async (req, res) => {
    try {
        const { error } = goalPostValidation(req.body);
        if (error)
            return res.status(400).send({ error: error.details[0].message });

        let { user_id, goal_type, purpose, start_date, reached_date, prescriptions, treatments, products } = req.body;

        if (goal_type !== 2 && goal_type !== 1)
            return res.status(400).json({ message: "Goal type can be 1 or 2 only" });

        const goal = await Goals.create({
            user_id,
            goal_type,
            purpose,
            start_date,
            reached_date,
        });

        const goals = await Goals.findAll();
        const goalId = goals[goals.length - 1].id;
        let goalsPrescription, goalsTreatment, goalsProduct;

        if (prescriptions) {
            goalsPrescription = await Promise.all(prescriptions.map(async (result) => {

                const createPrescription = await GoalsPrescriptions.create({
                    user_goal_id: goalId,
                    user_prescription_id: result
                })
                return createPrescription;
            }));
        }

        if (treatments) {
            goalsTreatment = await Promise.all(treatments.map(async (result) => {

                const createTreatment = await GoalsTreatments.create({
                    user_goal_id: goalId,
                    user_facial_treatment_id: result
                });
                return createTreatment;
            }));
        }

        if (products) {
            goalsProduct = await Promise.all(products.map(async (result) => {

                const createProduct = await GoalsProducts.create({
                    user_goal_id: goalId,
                    user_product_id: result
                });
                return createProduct;
            }));
        }

        const responseObject = {
            user_id,
            goal_type,
            purpose,
            start_date,
            reached_date,
            prescription: goalsPrescription,
            treatment: goalsTreatment,
            product: goalsProduct
        }
        return res.status(201).json({
            message: "Skincare goals added successfully",
            data: responseObject
        });

    } catch (err) {
        return res.status(400).json(err.message);
    }
};

// GET GOALS BY GOAL TYPE
exports.getGoalsByType = async (req, res) => {
    try {
        const type = req.params.goal_type;
        const userId = req.user.id;

        if (type !== '2' && type !== '1')
            return res.status(400).json({ message: "Invalid goal type" });

        const goals = await Goals.findAll({
            where: {
                goal_type: type,
                user_id: userId,
            },
            order: [['createdAt', 'DESC']],
            limit: 1,
        });

        if (goals.length === 0)
            return res.status(200).json({ message: "No skincare goals found with this user_id", data: { "goals": [] } });

        const userGoalId = goals[0].id;

        const associations = [
            {
                model: GoalsPrescriptions,
                where: { user_goal_id: userGoalId },
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: Prescription,
                        as: 'prescription',
                        attributes: ['provider', 'reason', 'diagnosis', 'visit_date'],
                    },
                ],
            },
            {
                model: GoalsTreatments,
                where: { user_goal_id: userGoalId },
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: Treatment,
                        as: 'treatment',
                        attributes: ['name', 'description'],
                    },
                ],
            },
            {
                model: GoalsProducts,
                where: { user_goal_id: userGoalId },
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: Product,
                        as: 'product',
                        attributes: ['brand', 'image', 'name', 'description', 'purchase_location', 'open_date',
                            'product_type_id', 'price', 'expiration_date'],
                        include: [
                            {
                                model: Products_Types,
                                as: "product_type",
                                attributes: ["name", "expiration_duration_days"],
                            },
                        ],
                    },
                ],
            },
            {
                model: SkinImages,
                where: { user_goal_id: userGoalId },
            },
        ];

        const promises = associations.map(association => association.model.findAll(association));

        const [prescription, treatment, product, skinImages] = await Promise.all(promises);

        const responseObject = {
            goals,
            prescription,
            treatment,
            product,
            skinImages
        };

        return res.status(200).json({
            message: 'Skincare goals list fetched',
            data: responseObject
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

//UPDATE Goals BY ID
exports.updateByIdGoals = async (req, res) => {
    try {
        const { error } = goalPutValidation(req.body);
        if (error)
            return res.status(400).send({ error: error.details[0].message });

        const id = req.params.id;
        const updatedData = req.body;
        const exceptionResult = await ValidateId(id);
        if (exceptionResult)
            return res.status(400).json(exceptionResult);

        const userId = req.user.id;
        const userExist = await Goals.findOne({ where: { user_id: userId, id: id } });
        if (!userExist)
            return res.status(200).json({ message: "No user found with this id", data: { "goals": [] } })

        const [updatedGoalsCount] = await Goals.update(updatedData, { where: { id: id } });

        if (updatedGoalsCount === 0) {
            return res.status(404).json({
                message: "Skincare goals not found",
            });
        }

        const updatedPrescriptions = req.body.prescriptions || [];
        const updatedTreatments = req.body.treatments || [];
        const updatedProducts = req.body.products || [];

        const bulkDestroyAndCreate = async (model, field, updatedArray, fieldName) => {
            await model.destroy({ where: { [field]: id } });
            const createArray = updatedArray.map(item => ({ [field]: id, [fieldName]: item }));
            console.log(createArray);
            await model.bulkCreate(createArray);
        };

        await Promise.all([
            bulkDestroyAndCreate(GoalsPrescriptions, 'user_goal_id', updatedPrescriptions, 'user_prescription_id'),
            bulkDestroyAndCreate(GoalsTreatments, 'user_goal_id', updatedTreatments, 'user_facial_treatment_id'),
            bulkDestroyAndCreate(GoalsProducts, 'user_goal_id', updatedProducts, 'user_product_id')
        ]);


        const [goals, prescription, treatment, product] = await Promise.all([
            Goals.findByPk(id),
            GoalsPrescriptions.findAll({
                where: { user_goal_id: id },
                include: [{ model: Prescription, as: 'prescription', attributes: ['provider', 'reason', 'diagnosis', 'visit_date'] }],
                order: [['createdAt', 'DESC']],
            }),
            GoalsTreatments.findAll({
                where: { user_goal_id: id },
                include: [{ model: Treatment, as: 'treatment', attributes: ['name', 'description'] }],
                order: [['createdAt', 'DESC']],
            }),
            GoalsProducts.findAll({
                where: { user_goal_id: id },
                include: [
                    {
                        model: Product,
                        as: 'product',
                        attributes: ['brand', 'name', 'image', 'description', 'purchase_location', 'open_date', 'product_type_id', 'price', 'expiration_date'],
                        include: [
                            {
                                model: Products_Types,
                                as: 'product_type',
                                attributes: ['name', 'expiration_duration_days'],
                            },
                        ],
                    },
                ],
                order: [['createdAt', 'DESC']],
            }),
        ]);

        const responseObject = {
            goals,
            prescription,
            treatment,
            product,
        };

        return res.status(200).json({
            message: "Skincare goals updated successfully",
            goals: responseObject,
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};
