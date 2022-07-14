import Joi from "joi";

export const authSchema = {
    email: Joi.string().required(),
    password: Joi.string().min(10).required()
} 