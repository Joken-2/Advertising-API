import { model, Schema, Types } from "mongoose";
import normalize from 'normalize-mongoose';

const productSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
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
    category: {
        type: String,
        required: true,
    },
    media: {
        type: [String],
        required: true
    }
}, {
    timestamps: true,
});

productSchema.plugin(normalize);

export const ProductModel = model('product', productSchema);