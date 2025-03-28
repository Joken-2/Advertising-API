import {  UserModel } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginUserValidator, registerUserValidator, updateUserValidator } from "../validators/user.js";
import { mailTransporter, registerUserMailTemplate } from "../utils/mailing.js";


export const addNewUser = async (req, res, next) => {
//  Validate User Info
const { error, value } = registerUserValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }

  // check if user does not exist alreadys
  const user = await UserModel.findOne({
    $or: [{ email: value.email }, {lastName: value.lastName}]
  });
  if (user) {
    return res.status(409).json('User already exists!')
}
  // hash plaintext password
  const hashedPassword = bcrypt.hashSync(value.password, 10);

    const result = await UserModel.create({
        ...value,
        password: hashedPassword,
    });

    // Send registration email to user
    await mailTransporter.sendMail({
        from: process.env.USER_EMAIL,
        to: value.email,
        subject: "Testing Mail",
        html: registerUserMailTemplate.replace('{{userName}}', value.userName),
    });
    res.status(201).json("User registered successfully!");
}

export const loginUser = async (req, res, next) => {
    // Validate user Info
    const {error, value} = loginUserValidator.validate(req.body);
    if (error) {
        return res.status(422).json(error);
    }
    // find matching user record in database
    const user = await UserModel.findOne({
        $or: [
            { userName: value.userName },
            { email: value.email }

        ]
    });
    if (!user) {
        return res.status(401).json("Invalid credentials!");
    };


    // compare incoming password with saved password 
    const correctPassword = bcrypt.compareSync(value.password, user.password);
    if (!correctPassword) {
        return res.status(401).json("Invalid credentials!");
    }

    // Generate access token for the User
    const accessToken = jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY, {
        expiresIn: "12h", 
    });
    // return response
    res.status(200).json({
        accessToken,
        user: {
            role: user.role,
            email: user.email,
            _id: user.id,
        }
    });
}

export const updateUser = async (req, res, next) => {
   const {error, value} = updateUserValidator.validate(req.body);
   if(error) {
    return res.status(422).json(error);
   }

//update User in Database
    const user = await UserModel.findByIdAndUpdate(
        req.params.id,
        value,

        { new: true }
    );

    // return response
    res.status(200).json('user updated successfully!')
}

export const getAuthenticatorUser = async (req, res, next) => {
    try {
        // Get user by id using req.auth.id
        const result = await UserModel.findById(req.auth.id).select({
            password:false,
        });
    
        // Return response
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
    
};