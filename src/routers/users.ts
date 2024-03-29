import { Router } from "express";

import {
  getUser,
  getUsers,
  updateUser,
  updateUserAvatar,
  getMe,
} from "../controllers/user";
import {
  findUserValidation,
  updateAvatarValidation,
  updateUserValidation,
} from "../utils/validation";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/me", getMe);
userRouter.get("/:userId", findUserValidation, getUser);
userRouter.patch("/me", updateUserValidation, updateUser);
userRouter.patch("/me/avatar", updateAvatarValidation, updateUserAvatar);

export default userRouter;
