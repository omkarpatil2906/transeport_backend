const Joi = require('joi');

const customerSchema = Joi.object({
  fullName: Joi.string().required(),
  userName: Joi.string().required(),
  email: Joi.string().email().required(),
  contactNumber: Joi.string().pattern(/^\d{10}$/).required(),
  password: Joi.string().min(6).required(),
  addresses: Joi.array().items(
    Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      pincode: Joi.string().required(),
      type: Joi.string().valid('home', 'work').required()
    })
  ).required()
});

module.exports = { customerSchema };
