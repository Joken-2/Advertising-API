import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    firstName:{
        type: String,
        required: true,
        unique: true,
    },
    lastName:{
        type: String,
        required: true,
        unique: true,
    },
    gender:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'vendor', 'manager', 'admin']
    }
}, {
    timestamps:true,
});

export const UserModel = model ('User', UserSchema);