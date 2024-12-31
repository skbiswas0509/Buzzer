import bcryptjs from 'bcryptjs'

import User from '../models/user.model.js'
import sendEmail from '../config/sendEmail.js'
import verifyEmailtemplate from '../utils/verifyEmailTemplate.js'


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

    
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export {registerUserControlller, verifyEmailController}