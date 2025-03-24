import Joi from "joi";


export const registerUserValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    userName: Joi.string().required(),
    gender: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.ref('password'),
}).with("password", "confirmPassword");

export const loginUserValidator = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),

});


export const updateUserValidator = Joi.object({
    role: Joi.string().valid('user', 'vendor', 'manager', 'admin').required(),
});