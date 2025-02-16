import {Router} from "express"
import auth from '../middlewares/auth.js'
import { createProductController, getProductByCategory, getProductByCategoryAndSubCategory, getProductController } from "../controllers/product.contoller.js"

const productRouter = Router()

productRouter.post("/create",auth,createProductController)
productRouter.post("/get",getProductController)
productRouter.post("/get-product-by-category",getProductByCategory)
productRouter.post("/get-product-by-category-and-subcategory",getProductByCategoryAndSubCategory)

export default productRouter