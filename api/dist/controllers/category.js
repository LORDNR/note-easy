"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
async function create(req, res) {
    try {
        (0, utils_1.reqValidation)(req);
        const { name } = req.body;
        const category = await utils_1.prisma.categoryNote.create({
            data: {
                name,
            },
        });
        return res.status(201).json({
            status: 'success',
            data: category,
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
        const categories = await utils_1.prisma.categoryNote.findMany();
        return res.status(200).json({
            status: 'success',
            data: categories,
        });
    }
    catch (error) {
        return res
            .status(400)
            .json({ status: 'error', message: error });
    }
}
async function findByName(req, res) {
    try {
        (0, utils_1.reqValidation)(req);
        const { name } = req.query;
        const category = await utils_1.prisma.categoryNote.findMany({
            where: {
                name: String(name),
            },
            select: {
                id: true,
            },
        });
        return res.status(200).json({
            status: 'success',
            data: category,
        });
    }
    catch (error) {
        return res
            .status(400)
            .json({ status: 'error', message: error });
    }
}
async function findById(req, res) {
    try {
        (0, utils_1.reqValidation)(req);
        const { id } = req.params;
        const category = await utils_1.prisma.categoryNote.findUniqueOrThrow({
            where: {
                id,
            },
        });
        return res.status(200).json({
            status: 'success',
            data: category,
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
        const { name } = req.body;
        await utils_1.prisma.categoryNote.update({
            where: {
                id,
            },
            data: {
                name,
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
        await utils_1.prisma.categoryNote.delete({
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
exports.default = { find, findByName, findById, create, update, remove };
//# sourceMappingURL=category.js.map