"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerController = exports.noteController = exports.categoryController = exports.authController = void 0;
const auth_1 = __importDefault(require("./auth"));
exports.authController = auth_1.default;
const category_1 = __importDefault(require("./category"));
exports.categoryController = category_1.default;
const note_1 = __importDefault(require("./note"));
exports.noteController = note_1.default;
const customer_1 = __importDefault(require("./customer"));
exports.customerController = customer_1.default;
//# sourceMappingURL=index.js.map