"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
async function verifyToken(req, res, next) {
    try {
        if (!req.headers.authorization) {
            throw 'Invalid authorization';
        }
        let token = req.headers.authorization;
        var decoded = jsonwebtoken_1.default.verify(token, config_1.default.environments.SECRET);
        req.customerId = decoded.id;
        return next();
    }
    catch (error) {
        return res
            .status(401)
            .json({ status: 'error', message: error });
    }
}
exports.verifyToken = verifyToken;
//# sourceMappingURL=auth.js.map