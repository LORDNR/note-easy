import { Router } from 'express'
import { checkSchema } from 'express-validator'

import { categoryController } from '../controllers'
import {
	AddCategoryRequest,
	GetCategoryByIdRequest,
	RemoveCategoryRequest,
	UpdateCategoryRequest,
} from '../types/category'

const categoryRouter = Router()

categoryRouter
	.post('/', checkSchema(AddCategoryRequest), categoryController.create)
	.get('/', categoryController.find)
	.get('/:id', checkSchema(GetCategoryByIdRequest), categoryController.findById)
	.put('/:id', checkSchema(UpdateCategoryRequest), categoryController.update)
	.delete('/:id', checkSchema(RemoveCategoryRequest), categoryController.remove)

export default categoryRouter
