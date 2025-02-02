import  {Router} from 'express'
import auth from '../middlewares/auth.js'
import { addCategoryController, deleteCategoryController, getCategoryController, updateCategoryController } from '../controllers/category.controller.js'

const categoryRouter = Router()


categoryRouter.post("/add-category",auth,addCategoryController)
categoryRouter.get("/get",getCategoryController)
categoryRouter.put("/update",auth,updateCategoryController)
categoryRouter.delete("/delete",auth,deleteCategoryController)

export default categoryRouter