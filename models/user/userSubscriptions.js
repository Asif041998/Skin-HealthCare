const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");
const SubscriptionPlans = require("../../models/user/subscriptionPlans");

const UserSubscriptions = sequelize.define("user_subscriptions", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    subscription_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    order_id: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    purchase_time: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    platform: {
        type: DataTypes.ENUM('Android', 'iOS'),
        allowNull: false,
    },
    response_data: {
        type: DataTypes.JSON,
        allowNull: true,
    },

}, {
    freezeTableName: true
});

UserSubscriptions.belongsTo(SubscriptionPlans, {
    foreignKey: 'subscription_id',
    as: 'subscription'
});

module.exports = UserSubscriptions;
