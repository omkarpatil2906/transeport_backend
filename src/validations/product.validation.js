const Joi = require('joi')

const productSchema = Joi.object({
    productName: Joi.string().required(),
    productType: Joi.string().required(),
    amount: Joi.number().required(),
    description: Joi.string().required()
})

module.exports = { productSchema };