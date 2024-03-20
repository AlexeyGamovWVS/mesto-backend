import { Router } from "express";
import { createCard, deleteCard, getCards } from "../controllers/card";

const cardsRouter = Router();

cardsRouter.get("/", getCards);
cardsRouter.post("/", createCard);
cardsRouter.delete("/:cardId", deleteCard);

export default cardsRouter;
