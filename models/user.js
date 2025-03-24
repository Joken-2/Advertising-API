import { model, Schema } from "mongoose";
import normalize from 'normalize-mongoose';

const userSignupSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        
    },
    lastName: {
        type: String,
        required: true,
        
    },
    userName: {
        type: String
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
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

const userLoginSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

userSignupSchema.plugin(normalize);
userLoginSchema.plugin(normalize);

export const UserModel = model('User', userSignupSchema);
// export const UserLoginModel = model('User', userLoginSchema);