"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const auth_1 = require("../middlewares/auth");
const customerRouter = (0, express_1.Router)();
customerRouter.get('/profile', auth_1.verifyToken, controllers_1.customerController.profile);
exports.default = customerRouter;
//# sourceMappingURL=customer.js.map