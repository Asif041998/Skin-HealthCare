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

        const goalsPrescription = await Promise.all(prescriptions.map(async (result) => {

            const createPrescription = await GoalsPrescriptions.create({
                user_goal_id: goalId,
                user_prescription_id: result
            })
            return createPrescription;
        }));

        const goalsTreatment = await Promise.all(treatments.map(async (result) => {

            const createTreatment = await GoalsTreatments.create({
                user_goal_id: goalId,
                user_facial_treatment_id: result
            });
            return createTreatment;
        }));

        const goalsProduct = await Promise.all(products.map(async (result) => {

            const createProduct = await GoalsProducts.create({
                user_goal_id: goalId,
                user_product_id: result
            });
            return createProduct;
        }));

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
            message: "Goals added successfully",
            data: responseObject
        });

    } catch (err) {
        console.log(err.message)
        return res.status(400).send(err.message);
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
            return res.status(200).json({ message: "No goals found with this user_id", data: { "goals": [] } });

        const userGoalId = goals[0].id;

        const prescription = await GoalsPrescriptions.findAll({
            where: {
                user_goal_id: userGoalId,
            },
            order: [['createdAt', 'DESC']],
            // limit:1,
            include: [
                {
                    model: Prescription,
                    as: 'prescription',
                    attributes: ['provider', 'reason', 'diagnosis', 'visit_date'],
                },
            ],
        });
        const treatment = await GoalsTreatments.findAll({
            where: {
                user_goal_id: userGoalId,
            },
            order: [['createdAt', 'DESC']],
            // limit:1,
            include: [
                {
                    model: Treatment,
                    as: 'treatment',
                    attributes: ['name', 'description'],
                },
            ],
        });
        const product = await GoalsProducts.findAll({
            where: {
                user_goal_id: userGoalId,
            },
            order: [['createdAt', 'DESC']],
            // limit:1,
            include: [
                {
                    model: Product,
                    as: 'product',
                    attributes: ['brand', 'name', 'description', 'purchase_location', 'open_date',
                        'product_type_id', 'price', 'expiration_date'],

                    include: [
                        {
                            model: Products_Types,
                            as: "product_type",
                            attributes: ["name", "expiration_duration_days"],
                        },
                    ]
                },
            ],

        });
        const skinImages = await SkinImages.findAll({ where: { user_id: userId, goal_type: type } });

        const responseObject = {
            goals,
            prescription,
            treatment,
            product,
            skinImages
        }
        return res.status(200).json({
            message: 'Goals list fetched',
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

        const [updatedGoalsCount] = await Goals.update(updatedData, {
            where: { id: id },
        });

        if (updatedGoalsCount === 0) {
            return res.status(404).json({
                message: "Goals not found",
            });
        }

        if (req.body.prescriptions) {
            const prescriptions = req.body.prescriptions;
            await GoalsPrescriptions.destroy({
                where: {
                    user_goal_id: id,
                },
            });
            for (let i = 0; i < prescriptions.length; i++) {
                const prescriptionId = prescriptions[i];

                await GoalsPrescriptions.create({
                    user_goal_id: id,
                    user_prescription_id: prescriptionId,
                });
            }
        }
        if (req.body.treatments) {
            const treatments = req.body.treatments;
            await GoalsTreatments.destroy({
                where: {
                    user_goal_id: id,
                },
            });
            for (let i = 0; i < treatments.length; i++) {
                const treatmentId = treatments[i];

                await GoalsTreatments.create({
                    user_goal_id: id,
                    user_facial_treatment_id: treatmentId,
                });
            }
        }
        if (req.body.products) {
            const products = req.body.products;
            await GoalsProducts.destroy({
                where: {
                    user_goal_id: id,
                },
            });
            for (let i = 0; i < products.length; i++) {
                const productId = products[i];

                await GoalsProducts.create({
                    user_goal_id: id,
                    user_product_id: productId,
                });
            }
        }

        const goals = await Goals.findByPk(id);
        const prescription = await GoalsPrescriptions.findAll({
            where: {
                user_goal_id: id,
            },
            order: [['createdAt', 'DESC']],
            // limit:1,
            include: [
                {
                    model: Prescription,
                    as: 'prescription',
                    attributes: ['provider', 'reason', 'diagnosis', 'visit_date'],
                },
            ],
        });
        const treatment = await GoalsTreatments.findAll({
            where: {
                user_goal_id: id,
            },
            order: [['createdAt', 'DESC']],
            // limit:1,
            include: [
                {
                    model: Treatment,
                    as: 'treatment',
                    attributes: ['name', 'description'],
                },
            ],
        });
        const product = await GoalsProducts.findAll({
            where: {
                user_goal_id: id,
            },
            order: [['createdAt', 'DESC']],
            // limit:1,
            include: [
                {
                    model: Product,
                    as: 'product',
                    attributes: ['brand', 'name', 'description', 'purchase_location', 'open_date',
                        'product_type_id', 'price', 'expiration_date'],

                    include: [
                        {
                            model: Products_Types,
                            as: "product_type",
                            attributes: ["name", "expiration_duration_days"],
                        },
                    ]
                },
            ],

        })
        const responseObject = {
            goals,
            prescription,
            treatment,
            product,
        };

        return res.status(200).json({
            message: "Goals updated successfully",
            goals: responseObject,
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};
