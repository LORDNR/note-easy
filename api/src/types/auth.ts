import { Schema } from 'express-validator'

const RegisterSchema: Schema = {
	email: {
		isEmail: true,
		in: 'body',
		errorMessage: 'email must be email address',
	},
	password: {
		isString: true,
		in: 'body',
		errorMessage: 'password must be string',
		isLength: {
			options: { min: 6 },
			errorMessage: 'password must be at least 6 characters',
		},
	},
	firstname: {
		isString: true,
		in: 'body',
		errorMessage: 'firstname must be string',
	},
	lastname: {
		isString: true,
		in: 'body',
		errorMessage: 'firstname must be string',
	},
}

const LoginSchema: Schema = {
	email: {
		isEmail: true,
		in: 'body',
		errorMessage: 'email must be email address',
	},
	password: {
		isString: true,
		in: 'body',
		errorMessage: 'password must be string',
		isLength: {
			options: { min: 6 },
			errorMessage: 'password must be at least 6 characters',
		},
	},
}

export { RegisterSchema, LoginSchema }
