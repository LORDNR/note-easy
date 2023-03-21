"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveCategoryRequest = exports.UpdateCategoryRequest = exports.GetCategoryByIdRequest = exports.GetCategoryByNameRequest = exports.AddCategoryRequest = void 0;
const AddCategoryRequest = {
    name: {
        isString: true,
        in: 'body',
        errorMessage: 'name must be string',
    },
};
exports.AddCategoryRequest = AddCategoryRequest;
const GetCategoryByNameRequest = {
    name: {
        isString: true,
        in: 'query',
        errorMessage: 'name must be string',
    },
};
exports.GetCategoryByNameRequest = GetCategoryByNameRequest;
const GetCategoryByIdRequest = {
    id: {
        isUUID: true,
        in: 'params',
        errorMessage: 'id must be UUID',
    },
};
exports.GetCategoryByIdRequest = GetCategoryByIdRequest;
const UpdateCategoryRequest = {
    id: {
        isUUID: true,
        in: 'params',
        errorMessage: 'id must be UUID',
    },
    name: {
        isString: true,
        in: 'body',
        errorMessage: 'name must be string',
    },
};
exports.UpdateCategoryRequest = UpdateCategoryRequest;
const RemoveCategoryRequest = {
    id: {
        isUUID: true,
        in: 'params',
        errorMessage: 'id must be UUID',
    },
};
exports.RemoveCategoryRequest = RemoveCategoryRequest;
//# sourceMappingURL=category.js.map