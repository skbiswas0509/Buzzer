import { Router } from 'express'
import {registerUserControlller, verifyEmailController} from '../controllers/user.controller.js'

const userRouter = Router()

userRouter.post('/register', registerUserControlller)
userRouter.post('/verify-email',verifyEmailController)

export default userRouter 