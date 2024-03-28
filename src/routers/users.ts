import { Router } from "express";
import {
  getUser,
  getUsers,
  updateUser,
  updateUserAvatar,
  getMe,
} from "../controllers/user";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/me", getMe);
userRouter.get("/:userId", getUser);
userRouter.patch("/me", updateUser);
userRouter.patch("/me/avatar", updateUserAvatar);

export default userRouter;
