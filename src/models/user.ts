import { PROFILE_DEFAULTS } from "../app-config";
import mongoose from "mongoose";
import validator from "validator";
export interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    default: PROFILE_DEFAULTS.name,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    required: true,
    default: PROFILE_DEFAULTS.about,
  },
  avatar: {
    type: String,
    required: true,
    default: PROFILE_DEFAULTS.avatar,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email: string) => validator.isEmail(email),
      message: "Неверный адрес электронной почты",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});
export default mongoose.model<IUser>("user", userSchema);
