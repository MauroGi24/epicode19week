import express from 'express'
import { createUser, login, profile } from '../controller/authentication.controller.js'
import uploadImage from '../middleware/uploadImg.js'
import authorization from '../middleware/authorization.js'

const authenticationRouter = express.Router()

authenticationRouter.post('/register', uploadImage.single('avatar'), createUser)
authenticationRouter.post('/login', login)
authenticationRouter.get('/profile', authorization, profile)

export default authenticationRouter