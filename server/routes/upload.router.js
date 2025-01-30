import { Router } from "express";
import auth from "../middlewares/auth.j";
import uploadImageController from "../controllers/uploadImage.controller.js";

const uploadRouter = Router()

uploadRouter.post("/upload",auth,uploadImageController)

export default uploadRouter