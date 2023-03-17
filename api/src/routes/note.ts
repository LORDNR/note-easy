import { Router } from 'express'
import { checkSchema } from 'express-validator'

import { noteController } from '../controllers'
import {
	AddNoteRequest,
	GetNoteByIdRequest,
	RemoveNoteRequest,
	UpdateNoteRequest,
} from '../types/note'

const noteRouter = Router()

noteRouter
	.post('/', checkSchema(AddNoteRequest), noteController.create)
	.get('/', noteController.find)
	.get('/:id', checkSchema(GetNoteByIdRequest), noteController.findById)
	.put('/:id', checkSchema(UpdateNoteRequest), noteController.update)
	.delete('/:id', checkSchema(RemoveNoteRequest), noteController.remove)

export default noteRouter
