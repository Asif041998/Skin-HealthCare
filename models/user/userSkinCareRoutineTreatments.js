const { DataTypes } = require("sequelize");
const sequelize = require("../../database/connection");
const Treatments = require('../../models/user/treatments');

const userSkinCareRoutineTreatments = sequelize.define("user_skin_care_routine_facial_treatments", {
  user_skin_care_routine_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  user_facial_treatment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
}, {
  freezeTableName: true
});

userSkinCareRoutineTreatments.belongsTo(Treatments, {
  foreignKey: 'user_facial_treatment_id',
  as: 'treatment'
});

module.exports = userSkinCareRoutineTreatments;
