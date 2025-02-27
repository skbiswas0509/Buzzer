import {Router} from "express"
import auth from '../middlewares/auth.js'
import { createProductController, getProductByCategory, getProductByCategoryAndSubCategory, getProductController, getProductDetails, updateProductDetails } from "../controllers/product.contoller.js"
import { admin } from "../middlewares/Admin.js"

const productRouter = Router()

productRouter.post("/create",auth,admin,createProductController)
productRouter.post("/get",getProductController)
productRouter.post("/get-product-by-category",getProductByCategory)
productRouter.post("/get-product-by-category-and-subcategory",getProductByCategoryAndSubCategory)
productRouter.post("/get-product-details", getProductDetails)

//update product
productRouter.put('/update-product-details',auth,admin,updateProductDetails)

export default productRouter