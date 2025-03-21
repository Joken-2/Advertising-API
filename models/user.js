import { model, Schema } from "mongoose";
import normalize from 'normalize-mongoose';

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        unique: true,
    },
    lastName: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'vendor', 'manager', 'admin']
    }
}, {
    timestamps: true,
});

userSchema.plugin(normalize);

export const UserModel = model('User', userSchema);