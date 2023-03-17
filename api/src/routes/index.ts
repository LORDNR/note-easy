import { Router } from 'express'
import authRouter from './auth'
import categoryRouter from './category'
import noteRouter from './note'

const router = Router()

router.use('/auth', authRouter)
router.use('/category', categoryRouter)
router.use('/note', noteRouter)

export default router
