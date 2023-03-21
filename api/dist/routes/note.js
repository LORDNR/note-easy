"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const note_1 = require("../types/note");
const noteRouter = (0, express_1.Router)();
noteRouter
    .post('/', (0, express_validator_1.checkSchema)(note_1.AddNoteRequest), controllers_1.noteController.create)
    .get('/', controllers_1.noteController.find)
    .get('/:id', (0, express_validator_1.checkSchema)(note_1.GetNoteByIdRequest), controllers_1.noteController.findById)
    .get('/customer/:id', (0, express_validator_1.checkSchema)(note_1.GetNoteByCustomerRequest), controllers_1.noteController.findByCustomer)
    .put('/:id', (0, express_validator_1.checkSchema)(note_1.UpdateNoteRequest), controllers_1.noteController.update)
    .delete('/:id', (0, express_validator_1.checkSchema)(note_1.RemoveNoteRequest), controllers_1.noteController.remove);
exports.default = noteRouter;
//# sourceMappingURL=note.js.map