import { Router } from 'express'
import { checkSchema } from 'express-validator'

import { authController } from '../controllers'
import { RegisterSchema } from '../types/register'

const authRouter = Router()

authRouter
	.post('/register', checkSchema(RegisterSchema), authController.register)
	.get('/call-update-status/:token', authController.callUpdateStatus)

export default authRouter
