import {Router} from "express"
import auth from '../middlewares/auth.js'
import { createProductController } from "../controllers/product.contoller.js"

const productRouter = Router()

productRouter.post("/create",auth,createProductController)

export default productRouter