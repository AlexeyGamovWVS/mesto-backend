import { Router } from "express";
import {
  createCard,
  deleteCard,
  toggleLike,
  getCards,
} from "../controllers/card";

const cardsRouter = Router();

cardsRouter.get("/", getCards);
cardsRouter.post("/", createCard);
cardsRouter.delete("/:cardId", deleteCard);
// likes
cardsRouter.put(":cardId/likes", toggleLike);
cardsRouter.delete(":cardId/likes", toggleLike);

export default cardsRouter;
