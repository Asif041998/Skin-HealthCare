const Joi = require("joi");

const skinCareRoutineTreatmentPutValidation = (data) => {
    const Schema = Joi.object({
        user_skin_care_routine_id: Joi.number().integer(),
        user_facial_treatment_id: Joi.number().integer(),
    });
    return Schema.validate(data);
};

module.exports = skinCareRoutineTreatmentPutValidation;