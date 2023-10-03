const Joi = require("joi");

const skinCareRoutineTreatmentPostValidation = (data) => {
    const Schema = Joi.object({
        user_skin_care_routine_id: Joi.number().integer().required(),
        user_facial_treatment_id: Joi.number().integer().required(),
    });
    return Schema.validate(data);
};

module.exports = skinCareRoutineTreatmentPostValidation;