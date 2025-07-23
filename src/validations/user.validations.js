const Joi = require('joi');

const userSchema = Joi.object({
    fullName: Joi.string().required(),
    userName: Joi.string().required(),
    mobileNumber: Joi.string().pattern(/^\d{10}$/).required(),
    email: Joi.string().email().required(),
    address: Joi.string().required(),
    password: Joi.string().min(6).required(),
    isAgree: Joi.boolean().required()
});

module.exports = { userSchema };