import { Schema } from 'express-validator'

const AddNoteRequest: Schema = {
	title: {
		isString: true,
		in: 'body',
		errorMessage: 'description must be string',
	},
	description: {
		isString: true,
		in: 'body',
		errorMessage: 'description must be string',
	},
	tags: {
		isArray: true,
		in: 'body',
		errorMessage: 'tags must be an array',
		optional: true,
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
	tags: {
		isArray: true,
		in: 'body',
		errorMessage: 'tags must be an array',
		optional: true,
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
