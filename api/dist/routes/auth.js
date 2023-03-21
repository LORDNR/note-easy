"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const auth_1 = require("../types/auth");
const authRouter = (0, express_1.Router)();
authRouter
    .post('/register', (0, express_validator_1.checkSchema)(auth_1.RegisterRequest), controllers_1.authController.register)
    .post('/login', (0, express_validator_1.checkSchema)(auth_1.LoginRequest), controllers_1.authController.login)
    .get('/call-update-status/:token', controllers_1.authController.callUpdateStatus);
exports.default = authRouter;
//# sourceMappingURL=auth.js.map