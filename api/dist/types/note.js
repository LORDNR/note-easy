"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveNoteRequest = exports.UpdateNoteRequest = exports.GetNoteByCustomerRequest = exports.GetNoteByIdRequest = exports.AddNoteRequest = void 0;
const AddNoteRequest = {
    title: {
        isString: true,
        in: 'body',
        errorMessage: 'description must be string',
    },
    description: {
        isString: true,
        in: 'body',
        errorMessage: 'description must be string',
    },
    tags: {
        isArray: true,
        in: 'body',
        errorMessage: 'tags must be an array',
        optional: true,
    },
    customerId: {
        isUUID: true,
        in: 'body',
        errorMessage: 'customerId must be uuid',
    },
    categoryId: {
        isUUID: true,
        in: 'body',
        errorMessage: 'categoryId must be uuid',
    },
};
exports.AddNoteRequest = AddNoteRequest;
const GetNoteByIdRequest = {
    id: {
        isUUID: true,
        in: 'params',
        errorMessage: 'id must be UUID',
    },
};
exports.GetNoteByIdRequest = GetNoteByIdRequest;
const GetNoteByCustomerRequest = {
    id: {
        isUUID: true,
        in: 'params',
        errorMessage: 'id must be UUID',
    },
};
exports.GetNoteByCustomerRequest = GetNoteByCustomerRequest;
const UpdateNoteRequest = {
    id: {
        isUUID: true,
        in: 'params',
        errorMessage: 'id must be UUID',
    },
    title: {
        isString: true,
        in: 'body',
        errorMessage: 'title must be string',
    },
    description: {
        isString: true,
        in: 'body',
        errorMessage: 'description must be string',
    },
    tags: {
        isArray: true,
        in: 'body',
        errorMessage: 'tags must be an array',
        optional: true,
    },
    categoryId: {
        isUUID: true,
        in: 'body',
        errorMessage: 'categoryId must be uuid',
    },
};
exports.UpdateNoteRequest = UpdateNoteRequest;
const RemoveNoteRequest = {
    id: {
        isUUID: true,
        in: 'params',
        errorMessage: 'id must be UUID',
    },
};
exports.RemoveNoteRequest = RemoveNoteRequest;
//# sourceMappingURL=note.js.map