import 'dotenv/config'
import express from 'express'
import authorRouter from './router/author.router.js'
import postRouter from './router/post.router.js'
import authenticationRouter from './router/authentication.router.js'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'

const server = express()
const port= process.env.PORT
const host= process.env.HOST 

await mongoose.connect(process.env.MONGO_DB_CONNECTION).then(() =>
    console.log('Il database è connesso')).catch((err) => console.log(err))
server.use(helmet())

server.use(morgan('dev'))

server.use(express.json())

server.use(cors())

server.use("/authors", authorRouter)  // si mette solo authorRouter se non si vuole dare un prefisso
server.use("/posts", postRouter)
server.use("/auth", authenticationRouter)


server.listen(port, () => {console.log(`Il server è partito alla porta ${host}${port}`)})

