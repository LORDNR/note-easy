import { Schema } from 'express-validator'

const AddNoteRequest: Schema = {
	description: {
		isString: true,
		in: 'body',
		errorMessage: 'description must be string',
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
	title: {
		isString: true,
		in: 'body',
		errorMessage: 'title must be string',
	},
	description: {
		isString: true,
		in: 'body',
		errorMessage: 'description must be string',
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
