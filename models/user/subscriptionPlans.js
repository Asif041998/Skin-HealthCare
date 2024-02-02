const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");

const SubscriptionPlans = sequelize.define("subscription_plans", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('active', 'suspended', 'blocked'),
        allowNull: false,
    },
}, {
    freezeTableName: true
});

module.exports = SubscriptionPlans;
