import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import sendEmail from '../config/sendEmail.js'
import verifyEmailtemplate from '../utils/verifyEmailTemplate.js'
import generateAccessToken from '../utils/generateAccessToken.js'
import generateRefreshToken from '../utils/generateRefreshToken.js'
import uploadImageCloudinary from '../utils/uploadImageCloudinary.js'
import generateOTP from '../utils/generateOTP.js'
import forgotPasswordTemplate from '../utils/forgotPasswordTemplate.js'

// register admin
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
            error: false,
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

        const updateUser = await User.findByIdAndUpdate(user?._id,{
            last_login_date: new Date()
        })
        const cookiesOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None" //if frontend and backend are on different domain
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
            success: true,
            error: false,
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
        
        const updateUser = await User.updateOne({_id: userId}, {
            ...(name && {name : name}),
            ...(email && {email: email}),
            ...(mobile && {mobile: mobile}),
            ...(password && {password: hashedPassword})
        })

        return response.json({
            message: "Updated successfully",
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

//forgot password
async function forgotPasswordController(request, response){
    try {
        const {email} = request.body

        const user = await User.findOne({email})

        if(!user){
            return response.status(400).json({
                message: "Email not available",
                error: true,
                success: false
            })
        }

        const otp = generateOTP()
        const expireTime = new Date() + 60 * 60 * 1000  //1hr

        const update = await User.findByIdAndUpdate(user._id,{
            forgot_password_otp: otp,
            forget_password_expiry: new Date(expireTime).toISOString()
        })

        await sendEmail({
            sendTo: email,
            subject: "Forgot password otp from buzzer",
            html: forgotPasswordTemplate({
                name: user.name,
                otp: otp})
        })

        return response.json({
            message: "check your email",
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

//verify forgot password otp
async function verifyForgotPassword(request, response) {
    try {
        const {email, otp} = request.body

        if(!email || !otp){
            return response.status(400).json({
                message: "Provide required filed email or otp",
                error: true,
                success: false
            })
        }

        const user = await User.findOne({email})
        if(!user){
            return response.status(400).json({
                message: "Email not found",
                error: true,
                success: false
            })
        }

        const currentTime = new Date().toISOString()

        if(user.forget_password_expiry < currentTime){
            return response.status(400).json({
                message: "OTP exired",
                error: true,
                success: false
            })
        }
        if(otp !== user.forgot_password_otp){
            return response.status(400).json({
                message: "Invalid OTP",
                error: true,
                success: false
            })
        }

        // if otp is not expired
        //otp === user.forgot_password_otp

        const updateUser = await User.findByIdAndUpdate(user?._id,{
            forgot_password_otp: "",
            forget_password_expiry: ""
        })
        return response.json({
            message: "verified otp successfully",
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || message,
            error: true,
            success: false
        })
    }
}

//reset the password
async function resetPassword(request,response){
    try {
        const {email, newPassword, confirmNewPassword} = request.body
        if(!email || !newPassword || !confirmNewPassword){
            return response.status(400).json({
                message: "Provide required fields",
                error: true,
                success: false
            })
        }  
        const user = await User.findOne({email})
        
        if(!user){
            return response.status(400).json({
                message: "Email is not available",
                error: true,
                success: false
            })
        }

        if(newPassword !== confirmNewPassword){
            return response.status(400).json({
                message: "passwords do not match",
                error: true,
                success: false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(newPassword,salt)

        const update = await User.findOneAndUpdate(user._id,{
            password : hashedPassword
        })

        return response.json({
            message: "Password updated successfully",
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

//refresh token controller
async function refreshToken(request, response){
    try {
        const refreshToken = request.cookies.refreshToken || request?.headers?.authorization?.split(" ")[1]
        
        if(!refreshToken){
            return response.status(401).json({
                message: "Invalid token",
                error: true,
                success: false
            })
        }

        const verifyToken = await jwt.verify(refreshToken,process.env.SECRET_KEY_REFRESH_TOKEN)

        if(!verifyToken){
            return response.status(401).json({
                message: "Token is expired",
                error: true,
                success: false
            })
        }

        const userId = verifyToken?._id

        const newAccessToken = await generateAccessToken(userId)

        const cookiesOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None" //if frontend and backend are on different domain
        }

        response.cookie('accessToken',newAccessToken,cookiesOptions)

        return response.json({
            message: "New access token generated",
            error: false,
            success: true,
            data: {
                accessToken: newAccessToken
            }
        })
        
    } catch (error) {
        return response.status(500).json({
            message: error.messsage || error,
            error: true,
            success: false
        })
    }
}

//get login user details
async function userDetails(request, response){
    try {
        const userId = request.userId
        
        const user = await User.findById(userId).select('-password -refresh_token')

        return response.json({
            message: "User details",
            data : user,
            error: false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message: "Error",
            error: true,
            success: false
        })
    }
}

export {registerUserControlller, verifyEmailController, loginController, logoutController, 
    uploadAvatar, updateUserDetails, forgotPasswordController, verifyForgotPassword, resetPassword, refreshToken, userDetails}
