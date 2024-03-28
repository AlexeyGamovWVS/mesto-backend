import { Router } from "express";
import {
  createCard,
  deleteCard,
  deleteLike,
  getCards,
  putLike,
} from "../controllers/card";

const cardsRouter = Router();

cardsRouter.get("/", getCards);
cardsRouter.post("/", createCard);
cardsRouter.delete("/:cardId", deleteCard);
// likes
cardsRouter.put(":cardId/likes", putLike);
cardsRouter.delete(":cardId/likes", deleteLike);

export default cardsRouter;
