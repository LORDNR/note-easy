"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reqValidation = exports.prisma = void 0;
const prisma_1 = __importDefault(require("./prisma"));
exports.prisma = prisma_1.default;
const validation_1 = require("./validation");
Object.defineProperty(exports, "reqValidation", { enumerable: true, get: function () { return validation_1.reqValidation; } });
//# sourceMappingURL=index.js.map