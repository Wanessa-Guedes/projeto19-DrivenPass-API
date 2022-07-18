import Joi from "joi";

export const cardSchema = Joi.object({
    title: Joi.string().required(),
    name: Joi.string().required(),
    number: Joi.string().pattern(new RegExp('^[0-9]{16}$')).required(),
    securityCode: Joi.string().pattern(new RegExp('^[0-9]{3}$')).required(),
    expirationDate: Joi.string().pattern(new RegExp('^[0-9]{2}\/[0-9]{2}$')).required(),
    password: Joi.string().required(),
    is_virtual: Joi.boolean(),
    type: Joi.string().valid("crédito", "débito", "ambos").insensitive().required()
}) 