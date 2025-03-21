import {UserModel} from "../models/user.js";

export const addNewUser = async(req, res, next) => {
    const result = await UserModel.create({
        ...value
    });
    res.status(201),json('user added successfully!');
}

export const loginUser = async(req, res, next) => {
    const user = await UserModel.findOne({
        $or: [
            {username: value.username},
            {email: value.email}
        ]
    });
    if(!user){
        return res.status(409).json('user does not exist!')
    }
}

export const updateUser = async(req, res, next) => {
    const user = await UserModel.findByIdAndUpdate(
        req.params.id,
        value,
        {new: true}
    );
    res.status(200).json('user updated successfully!')
}