const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");

const skinImagesTracker = sequelize.define("user_skin_images", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    image_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    file_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true
});

module.exports = skinImagesTracker;
