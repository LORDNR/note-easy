"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const category_1 = __importDefault(require("./category"));
const note_1 = __importDefault(require("./note"));
const customer_1 = __importDefault(require("./customer"));
const router = (0, express_1.Router)();
router.use('/auth', auth_1.default);
router.use('/category', category_1.default);
router.use('/note', note_1.default);
router.use('/customer', customer_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map