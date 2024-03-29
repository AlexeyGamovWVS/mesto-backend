import mongoose from "mongoose";
import validator from "validator";

export interface ICard {
  name: string;
  link: string;
  owner: mongoose.Types.ObjectId;
  likes: Array<mongoose.Types.ObjectId> | [];
  createdAt: Date;
}

const cardSchema = new mongoose.Schema<ICard>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (url: string) => validator.isURL(url),
      message: "Некорректная ссылка на изображение",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model<ICard>("card", cardSchema);
