"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reqValidation = void 0;
const express_validator_1 = require("express-validator");
function reqValidation(req) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw errors.array().map((error) => error.msg);
    }
}
exports.reqValidation = reqValidation;
//# sourceMappingURL=validation.js.map