const UserSubscriptions = require("../../models/user/userSubscriptions");
const SubscriptionPlans = require("../../models/user/subscriptionPlans");
const subscriptionPostValidation = require("../../validations/user/subscriptions/subscriptionPost");
const ValidateId = require('../../services/exceptionHandling');
const { Op } = require('sequelize');

// CREATE USER SUBSCRIPTION
exports.createSubcription = async (req, res) => {
    try {

        const { error } = subscriptionPostValidation(req.body);
        if (error) {
          return res.status(400).send({ error: error.details[0].message });
        }

        let { user_id, subscription_id, start_date, end_date, order_id, purchase_time, status, response_data, platform } = req.body;

        const user = await UserSubscriptions.findOne({ where: { order_id: order_id } });
        if (user)
            return res.status(409).json({ message: "Order id already exists, it should be unique" });

        const userSubscription = await UserSubscriptions.create({
            user_id,
            subscription_id,
            start_date,
            end_date,
            order_id,
            purchase_time,
            status,
            platform,
            response_data
        });

        return res.status(201).json({
            message: "User subscription added successfully",
            data: userSubscription
        });

    } catch (err) {
        return res.status(400).send(err.message);
    }
};

//UPDATE USER SUBSCRIPTION BY ID
exports.updatesSubcription = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user.id;
        const updatedData = req.body;

        const exceptionResult = await ValidateId(id);
        if (exceptionResult)
            return res.status(400).json(exceptionResult);

        const subscription = await UserSubscriptions.findOne({
            where: {
                id: id,
                user_id: userId,
            },
        });
        if (!subscription) {
            return res.status(400).json({
                message: "User subscription does not exist with this id",
                data: []
            });
        }

        const [updatedRowsCount] = await UserSubscriptions.update(updatedData, {
            where: { id: id },
        });

        if (updatedRowsCount === 0) {
            return res.status(404).json({
                message: "User subscription not found",
            });
        }

        const updatedSubscription = await UserSubscriptions.findByPk(id);

        return res.status(200).json({
            message: "User subscription updated successfully",
            data: updatedSubscription,
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// GET BY USER-ID
exports.getSubcriptionsByUserId = async (req, res) => {
    try {
        const userId = req.params.user_id;


        const exceptionResult = await ValidateId(userId);
        if (exceptionResult)
            return res.status(400).json(exceptionResult);

        const subscription = await UserSubscriptions.findOne({
            where: { user_id: userId },
            include: [
                {
                    model: SubscriptionPlans,
                    as: "subscription",
                    attributes: ["id", "name", "type", "amount", "status"],
                },
            ],
            order: [['createdAt', 'DESC']]
        });
        if (!subscription) {
            return res.status(200).json({
                message: "User subscription not found", data: []
            });
        }

        return res.status(200).json({
            message: "User subscription details fetched",
            data: [subscription],
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};
