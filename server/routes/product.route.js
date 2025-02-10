import {Router} from "express"
import auth from '../middlewares/auth.js'
import { createProductController, getProductController } from "../controllers/product.contoller.js"

const productRouter = Router()

productRouter.post("/create",auth,createProductController)
productRouter.post("/get",getProductController)

export default productRouter