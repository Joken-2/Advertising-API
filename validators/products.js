import Joi from "joi"

export const addProductValidator = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    media: Joi.array().items(Joi.string().required()),

});


export const replaceProductValidator = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    media: Joi.array().items(Joi.string().required()),
})