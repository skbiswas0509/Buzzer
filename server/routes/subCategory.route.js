import { Router } from "express";
import { AddSubCategoryController, getSubCategoryController } from "../controllers/subCategory.controller.js";
import auth from "../middlewares/auth.js";

const subCategoryRouter = Router()

subCategoryRouter.post("/create",auth, AddSubCategoryController)
subCategoryRouter.post("/get", getSubCategoryController)

export default subCategoryRouter