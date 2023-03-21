"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRequest = exports.RegisterRequest = void 0;
const RegisterRequest = {
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
};
exports.RegisterRequest = RegisterRequest;
const LoginRequest = {
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
};
exports.LoginRequest = LoginRequest;
//# sourceMappingURL=auth.js.map