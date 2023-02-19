import dotenv from "dotenv"
import express from 'express'
import mongoose from 'mongoose'
import memoryRoutes from "./routes/memory.js"
import authRoutes from './routes/auth.js'

dotenv.config()

const app = express()

app.use(express.json())

app.use("/api/memories", memoryRoutes)

app.use("/api/auth", authRoutes)

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_STRING)
    .then(() =>{
        app.listen(process.env.PORT, () =>{
            console.log("Connected to DB and Listening on port 4000")
        })
    })
    .catch((error)=>{
        console.log(error)
    })




