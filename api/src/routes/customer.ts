import { Router } from 'express'

import { customerController } from '../controllers'
import { verifyToken } from '../middlewares/auth'

const customerRouter = Router()

customerRouter.get('/profile', verifyToken, customerController.profile)

export default customerRouter
