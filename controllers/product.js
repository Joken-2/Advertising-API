import { ProductModel } from '../models/product.js';

export const addProduct = async (req, res, next) => {
    const result = await ProductModel.create({
        ...value
    });
    res.status(201).json(result);
}

export const getProducts = async (req, res, next) => {
    try {
        const { filter = '{}', sort = '{}' } = req.query;

        const result = await ProductModel.find(JSON.parse(filter)).sort(JSON.parse(sort));

        res.json(result);
    } catch (error) {
        next(error);
    }
}

export const updatedProduct = (req, res) => {
    res.send(`Product with id ${req.params.id} updated!`)
}

export const replaceProduct = async (req, res, next) => {
    const result = await ProductModel.findOneAndReplace(
        { _id: req.params.id },
        req.body,
        { new: true }
    );
    res.status(200).json(result)
}

export const deleteProduct = (req, res) => {
    res.send(`Product with id ${req.params.id} deleted!`)
}