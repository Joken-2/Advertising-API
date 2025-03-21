import { model, Schema, Types } from "mongoose";

const ProductSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    },
    images: {
        type: String,
        required: true
    }
}, {
    timestamps:true,
});

export const ProductModel = model ('product', ProductSchema);