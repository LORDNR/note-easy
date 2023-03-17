import { Schema } from 'express-validator'

const AddNoteRequest: Schema = {
	noteMessage: {
		isString: true,
		in: 'body',
		errorMessage: 'note must be string',
	},
	customerId: {
		isUUID: true,
		in: 'body',
		errorMessage: 'customerId must be uuid',
	},
	categoryId: {
		isUUID: true,
		in: 'body',
		errorMessage: 'categoryId must be uuid',
	},
}

const GetNoteByIdRequest: Schema = {
	id: {
		isUUID: true,
		in: 'params',
		errorMessage: 'id must be UUID',
	},
}
const GetNoteByCustomerRequest: Schema = {
	id: {
		isUUID: true,
		in: 'params',
		errorMessage: 'id must be UUID',
	},
}

const UpdateNoteRequest: Schema = {
	id: {
		isUUID: true,
		in: 'params',
		errorMessage: 'id must be UUID',
	},
	noteMessage: {
		isString: true,
		in: 'body',
		errorMessage: 'note must be string',
	},
	categoryId: {
		isUUID: true,
		in: 'body',
		errorMessage: 'categoryId must be uuid',
	},
}

const RemoveNoteRequest: Schema = {
	id: {
		isUUID: true,
		in: 'params',
		errorMessage: 'id must be UUID',
	},
}

export {
	AddNoteRequest,
	GetNoteByIdRequest,
	GetNoteByCustomerRequest,
	UpdateNoteRequest,
	RemoveNoteRequest,
}
