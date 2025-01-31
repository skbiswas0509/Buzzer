import  {Router} from 'express'
import auth from '../middlewares/auth.js'
import { addCategoryController, getCategoryController } from '../controllers/category.controller.js'

const categoryRouter = Router()


categoryRouter.post("/add-category",auth,addCategoryController)
categoryRouter.get("/get",getCategoryController)

export default categoryRouter