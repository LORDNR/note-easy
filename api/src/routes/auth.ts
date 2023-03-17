import { Router } from 'express'
import { checkSchema } from 'express-validator'

import { authController } from '../controllers'
import { LoginSchema, RegisterSchema } from '../types/auth'

const authRouter = Router()

authRouter
	.post('/register', checkSchema(RegisterSchema), authController.register)
	.post('/login', checkSchema(LoginSchema), authController.login)
	.get('/call-update-status/:token', authController.callUpdateStatus)

export default authRouter
