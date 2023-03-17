import { Router } from 'express'
import { checkSchema } from 'express-validator'

import { noteController } from '../controllers'
import {
	AddNoteRequest,
	GetNoteByCustomerRequest,
	GetNoteByIdRequest,
	RemoveNoteRequest,
	UpdateNoteRequest,
} from '../types/note'

const noteRouter = Router()

noteRouter
	.post('/', checkSchema(AddNoteRequest), noteController.create)
	.get('/', noteController.find)
	.get('/:id', checkSchema(GetNoteByIdRequest), noteController.findById)
	.get('/customer/:id', checkSchema(GetNoteByCustomerRequest), noteController.findByCustomer)
	.put('/:id', checkSchema(UpdateNoteRequest), noteController.update)
	.delete('/:id', checkSchema(RemoveNoteRequest), noteController.remove)

export default noteRouter
