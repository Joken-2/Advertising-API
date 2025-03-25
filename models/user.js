import { model, Schema } from "mongoose";
import normalize from "normalize-mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true
    },
    gender:{
        type: String,
        required: true
    },
    
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "customer",
      enum: ["customer", "vendor"],
    },
  },
  {
    timestamps: true,
  }
);

// const userLoginSchema = new Schema(
//   {
//     userName: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

userSchema.plugin(normalize);
// userLoginSchema.plugin(normalize);

export const UserModel = model("User", userSchema);
// export const UserLoginModel = model("Users", userLoginSchema);
