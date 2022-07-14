import Joi from "joi";

export const authSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(10).required()
}) 