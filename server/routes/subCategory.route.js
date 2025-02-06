import { Router } from "express";
import { AddSubCategoryController, deleteSubCategoryController, getSubCategoryController, updateSubCategoryController } from "../controllers/subCategory.controller.js";
import auth from "../middlewares/auth.js";

const subCategoryRouter = Router()

subCategoryRouter.post("/create",auth, AddSubCategoryController)
subCategoryRouter.post("/get", getSubCategoryController)
subCategoryRouter.put("/update",auth,updateSubCategoryController)
subCategoryRouter.delete("/delete",auth,deleteSubCategoryController)

export default subCategoryRouter