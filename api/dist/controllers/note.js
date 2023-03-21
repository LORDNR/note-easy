"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const profanity_check_1 = require("../utils/profanity-check");
const utils_1 = require("../utils");
const multiLanguageFilter = new profanity_check_1.Filter({
    languages: ['thai', 'english'],
});
async function create(req, res) {
    try {
        (0, utils_1.reqValidation)(req);
        let { title, description, customerId, categoryId, tags } = req.body;
        // console.log(multiLanguageFilter.isProfane(title))
        // console.log(multiLanguageFilter.isProfane(description))
        const noteData = await utils_1.prisma.note.create({
            data: {
                title,
                description,
                tags,
                customer: {
                    connect: {
                        id: customerId,
                    },
                },
                categoryNote: {
                    connect: {
                        id: categoryId,
                    },
                },
                HistoryNote: {
                    create: {
                        customer: {
                            connect: {
                                id: customerId,
                            },
                        },
                    },
                },
            },
        });
        return res.status(201).json({
            status: 'success',
            data: noteData,
        });
    }
    catch (error) {
        return res
            .status(400)
            .json({ status: 'error', message: error });
    }
}
async function find(req, res) {
    try {
        const notes = await utils_1.prisma.note.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                tags: true,
                customer: {
                    select: {
                        email: true,
                    },
                },
                categoryNote: {
                    select: {
                        name: true,
                    },
                },
                createdAt: true,
                updatedAt: true,
            },
            orderBy: {
                updatedAt: 'desc',
            },
        });
        return res.status(200).json({
            status: 'success',
            data: notes,
        });
    }
    catch (error) {
        return res
            .status(400)
            .json({ status: 'error', message: `${error}` });
    }
}
async function findById(req, res) {
    try {
        (0, utils_1.reqValidation)(req);
        const { id } = req.params;
        const note = await utils_1.prisma.note.findUniqueOrThrow({
            where: {
                id,
            },
            select: {
                id: true,
                title: true,
                description: true,
                tags: true,
                customer: {
                    select: {
                        email: true,
                    },
                },
                categoryNote: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        return res.status(200).json({
            status: 'success',
            data: note,
        });
    }
    catch (error) {
        return res
            .status(400)
            .json({ status: 'error', message: error });
    }
}
async function findByCustomer(req, res) {
    try {
        (0, utils_1.reqValidation)(req);
        const { id } = req.params;
        const note = await utils_1.prisma.note.findMany({
            where: {
                customerId: id,
            },
            select: {
                id: true,
                title: true,
                description: true,
                tags: true,
                categoryNote: {
                    select: {
                        name: true,
                    },
                },
                createdAt: true,
                updatedAt: true,
            },
        });
        return res.status(200).json({
            status: 'success',
            data: note,
        });
    }
    catch (error) {
        return res
            .status(400)
            .json({ status: 'error', message: error });
    }
}
async function update(req, res) {
    try {
        (0, utils_1.reqValidation)(req);
        const { id } = req.params;
        const { title, description, tags, categoryId } = req.body;
        await utils_1.prisma.note.update({
            where: {
                id,
            },
            data: {
                title,
                description,
                tags,
                categoryNote: {
                    connect: {
                        id: categoryId,
                    },
                },
            },
        });
        return res.status(200).json({
            status: 'success',
            message: 'Update success.',
        });
    }
    catch (error) {
        return res
            .status(400)
            .json({ status: 'error', message: error });
    }
}
async function remove(req, res) {
    try {
        (0, utils_1.reqValidation)(req);
        const { id } = req.params;
        await utils_1.prisma.historyNote.deleteMany({
            where: {
                noteId: id,
            },
        });
        await utils_1.prisma.note.delete({
            where: {
                id,
            },
        });
        return res.status(204).end();
    }
    catch (error) {
        return res
            .status(400)
            .json({ status: 'error', message: error });
    }
}
exports.default = { create, find, findById, findByCustomer, update, remove };
//# sourceMappingURL=note.js.map