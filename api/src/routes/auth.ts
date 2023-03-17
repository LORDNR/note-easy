import { Router } from 'express'
import { checkSchema } from 'express-validator'

import { authController } from '../controllers'
import { LoginRequest, RegisterRequest } from '../types/auth'

const authRouter = Router()

authRouter
	.post('/register', checkSchema(RegisterRequest), authController.register)
	.post('/login', checkSchema(LoginRequest), authController.login)
	.get('/call-update-status/:token', authController.callUpdateStatus)

export default authRouter
