import bcryptjs from 'bcryptjs'

import User from '../models/user.model.js'
import sendEmail from '../config/sendEmail.js'
import verifyEmailtemplate from '../utils/verifyEmailTemplate.js'
import generateAccessToken from '../utils/generateAccessToken.js'
import generateRefreshToken from '../utils/generateRefreshToken.js'
import uploadImageCloudinary from '../utils/uploadImageCloudinary.js'


async function registerUserControlller(request, response){
    try {
        const {name, email, password} = request.body

        if(!name || !email || !password){
            return response.status(400).json({
                message: "Provide Email, Name & Password",
                error: true,
                success: false,
            })
        }

        const user = await User.findOne({email})
        if(user){
            return response.json({
                message: "Email already registered",
                error: false,
                success: false
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)

        const payload = {
            name,
            email,
            password : hashedPassword
        }

        const newUser = new User(payload)
        const save = await newUser.save()

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: "Verify Email from Buzzer",
            html: verifyEmailtemplate({
                name,
                url: verifyEmailUrl
            })
        })

        return response.json({
            message: "User registered successfully",
            error: true,
            success: true,
            data: save
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
} 

async function verifyEmailController(request, response){
    try {
        const {code} = request.body

        const user = await User.findOne({ _id: code })

        if(!user){
            return response.status(400).json({
                message: "Inavlid code",
                error: true,
                success: false
            })
        }

        const updateUser = await User.updateOne({ _id: code }, {
            verify_email: true
        })

        return response.json({
            message: "Verification email done",
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: true
        })
    }
}

//login controller
async function loginController(request, response){
    try {
        const {email, password} = request.body;

        if(!email || !password){
            return response.status(400).json({
                messsage: "Provide email and password",
                error: true,
                success: false
            })
        }

        const user = await User.findOne({ email })
        if(!user){
            return response.status(400).json({
                message: "User not registered",
                error: true,
                success: false
            })
        }

        if(user.status !== "Active"){
            return response.status(400).json({
                message: "Contact to admin",
                error: true,
                success: false
            })
        }

        const checkPassword = await bcryptjs.compare(password, user.password)

        if(!checkPassword){
            return response.status(400).json({
                message: "Password is wrong",
                error: true,
                success: false,
            })
        }

        const accessToken = await generateAccessToken(user._id)
        const refreshToken = await generateRefreshToken(user._id)

        const cookiesOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }
        response.cookie('accessToken', accessToken, cookiesOptions)
        response.cookie('refreshToken', refreshToken, cookiesOptions)

        return response.json({
            message: "Login successfull",
            error: false,
            success: true,
            data: {
                accessToken,
                refreshToken
            }
        })

    
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//logout controller
async function logoutController(request, response){
    try {
        const userId = request.userId //middleware

        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        response.clearCookie('accessToken', cookieOption)
        response.clearCookie('refreshToken', cookieOption)

        const removeRefreshToken = await User.findByIdAndUpdate(userId, {
            refresh_token: ""
        })

        return response.json({
            message: "Logout successfully",
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//upload user avatar
async function uploadAvatar(request, response){
    try {
        const userId = request.userId 
        const image = request.file

        const upload = await uploadImageCloudinary(image)

        const upadteUser = await User.findByIdAndUpdate(userId, {
            avatar: upload.url
        })
        return response.json({
            message: "uploaded profile",
            data : {
                _id: userId,
                avatar: upload.url
            }
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//update user details
async function updateUserDetails(request,response){
    try {
        const userId = request.userId
        const {name,email,mobile,password} = request.body
        
        let hashedPassword = ""

        if(password){
            const salt = await bcryptjs.genSalt(10)
            hashedPassword = await bcryptjs.hash(password,salt)
        }
        
        const updateUser = await User.findByIdAndUpdate(userId, {
            ...(name && {name : name}),
            ...(email && {email: email}),
            ...(mobile && {mobile: mobile}),
            ...(password && {password: hashedPassword})
        })

        return response.json({
            message: "Updated user successfully",
            error: false,
            success: true,
            data: updateUser

        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export {registerUserControlller, verifyEmailController, loginController, logoutController, uploadAvatar, updateUserDetails}