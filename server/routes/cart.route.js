import {Router} from 'express';
import auth from '../middlewares/auth.js';
import { addToCartItemController } from '../controllers/cart.controller.js';

const cartRouter = Router()

cartRouter.post("/create",auth,addToCartItemController)

export default cartRouter