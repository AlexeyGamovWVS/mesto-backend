import { Router } from "express";
import {
  createCard,
  deleteCard,
  toggleLike,
  getCards,
} from "../controllers/card";
import {
  deleteCardValidation,
  likeCardValidation,
  postCardValidation,
} from "../utils/validation";

const cardsRouter = Router();

cardsRouter.get("/", getCards);
cardsRouter.post("/", postCardValidation, createCard);
cardsRouter.delete("/:cardId", deleteCardValidation, deleteCard);
// likes
cardsRouter.put("/:cardId/likes", likeCardValidation, toggleLike);
cardsRouter.delete("/:cardId/likes", likeCardValidation, toggleLike);

export default cardsRouter;
