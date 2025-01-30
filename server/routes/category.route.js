import  {Router} from 'express'
import auth from '../middlewares/auth.js'
import { addCategoryController } from '../controllers/category.controller.js'

const categoryRouter = Router()


categoryRouter.post("/add-category",auth,addCategoryController)

export default categoryRouter