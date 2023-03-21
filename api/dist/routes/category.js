"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const category_1 = require("../types/category");
const categoryRouter = (0, express_1.Router)();
categoryRouter
    .post('/', (0, express_validator_1.checkSchema)(category_1.AddCategoryRequest), controllers_1.categoryController.create)
    .get('/', controllers_1.categoryController.find)
    .get('/name', (0, express_validator_1.checkSchema)(category_1.GetCategoryByNameRequest), controllers_1.categoryController.findByName)
    .get('/:id', (0, express_validator_1.checkSchema)(category_1.GetCategoryByIdRequest), controllers_1.categoryController.findById)
    .put('/:id', (0, express_validator_1.checkSchema)(category_1.UpdateCategoryRequest), controllers_1.categoryController.update)
    .delete('/:id', (0, express_validator_1.checkSchema)(category_1.RemoveCategoryRequest), controllers_1.categoryController.remove);
exports.default = categoryRouter;
//# sourceMappingURL=category.js.map