import { model, Schema, Types } from "mongoose";
import normalize from 'normalize-mongoose';

const productSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    images: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

productSchema.plugin(normalize);

export const ProductModel = model('product', productSchema);