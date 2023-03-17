import { Schema } from 'express-validator'

const AddCategoryRequest: Schema = {
	name: {
		isString: true,
		in: 'body',
		errorMessage: 'name must be string',
	},
}

const GetCategoryByIdRequest: Schema = {
	id: {
		isUUID: true,
		in: 'params',
		errorMessage: 'id must be UUID',
	},
}

const UpdateCategoryRequest: Schema = {
	id: {
		isUUID: true,
		in: 'params',
		errorMessage: 'id must be UUID',
	},
	name: {
		isString: true,
		in: 'body',
		errorMessage: 'name must be string',
	},
}

const RemoveCategoryRequest: Schema = {
	id: {
		isUUID: true,
		in: 'params',
		errorMessage: 'id must be UUID',
	},
}

export {
	AddCategoryRequest,
	GetCategoryByIdRequest,
	UpdateCategoryRequest,
	RemoveCategoryRequest,
}
