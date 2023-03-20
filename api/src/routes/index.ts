import { Router } from 'express'
import authRouter from './auth'
import categoryRouter from './category'
import noteRouter from './note'
import customerRouter from './customer'

const router = Router()

router.use('/auth', authRouter)
router.use('/category', categoryRouter)
router.use('/note', noteRouter)
router.use('/customer', customerRouter)

export default router
