import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
dotenv.config()
import connectDB from './config/connectDB.js'
import userRouter from './routes/user.route.js'

const app = express()
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(helmet({
    crossOriginResourcePolicy: false
}))

const PORT = process.env.PORT || 3000;

app.get("/", (request, response)=>{
    //server to client
    response.json({
        message: `Server is running on port ${PORT}`,
    })
})

app.use("/api/user", userRouter)

connectDB().then(() =>{
    app.listen(PORT, ()=>{
        console.log("Server is runnning", PORT)
    })
})