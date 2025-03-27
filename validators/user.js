import Joi from "joi";


export const registerUserValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    userName: Joi.string().required(),
    gender:Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.ref('password'),
    role: Joi.string().valid("customer", "vendor").required().default("customer"),
}).with("password", "confirmPassword");

export const loginUserValidator = Joi.object({
    userName: Joi.optional(),
    email: Joi.optional(),
    password: Joi.string().required(),

});


export const updateUserValidator = Joi.object({
    role: Joi.string().valid("customer", "vendor").required(),
});