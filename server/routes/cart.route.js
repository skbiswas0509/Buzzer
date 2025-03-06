import {Router} from 'express';
import auth from '../middlewares/auth.js';
import { addToCartItemController, getCartItemController, updateCartItemQtyController } from '../controllers/cart.controller.js';

const cartRouter = Router()

cartRouter.post("/create",auth,addToCartItemController)
cartRouter.get("/get",auth,getCartItemController)
cartRouter.put("/update-qty",auth,updateCartItemQtyController)
export default cartRouter