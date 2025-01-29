import { Router } from 'express'
import {loginController, logoutController, registerUserControlller, verifyEmailController, uploadAvatar, updateUserDetails, forgotPasswordController, verifyForgotPassword, resetPassword, refreshToken, userDetails} from '../controllers/user.controller.js'
import auth from '../middlewares/auth.js'
import upload from '../middlewares/multer.js'

const userRouter = Router()

userRouter.post('/register', registerUserControlller)
userRouter.post('/verify-email',verifyEmailController)
userRouter.post('/login',loginController)
userRouter.get('/logout',auth,logoutController)
userRouter.put('/upload-avatar',auth,upload.single('avatar'),uploadAvatar)
userRouter.put('/update-user',auth,updateUserDetails)
userRouter.put('/forgot-password',forgotPasswordController)
userRouter.put('/verify-password-otp',verifyForgotPassword)
userRouter.put('/reset-password',resetPassword)
userRouter.post('/refresh_token',refreshToken)
userRouter.get('/user-details',auth,userDetails)

export default userRouter 