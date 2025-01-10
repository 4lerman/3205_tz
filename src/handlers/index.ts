import express, { Router } from "express";
import middlewares from "../middlewares/error"
import controllers from "../controllers"

export const api: Router = express.Router();

api.post("/shorten", middlewares.cover(controllers.createUrl));
api.get("/:shortUrl", middlewares.cover(controllers.redirectUrl));
api.get("/info/:shortUrl", middlewares.cover(controllers.getUrlInfo))
api.delete("/delete/:shortUrl", middlewares.cover(controllers.deleteUrl))
