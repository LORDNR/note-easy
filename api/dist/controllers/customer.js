"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
async function profile(req, res) {
    const customerId = req.customerId;
    try {
        const profile = await utils_1.prisma.customer.findUniqueOrThrow({
            where: {
                id: customerId,
            },
            select: {
                id: true,
                email: true,
                firstname: true,
                lastname: true,
                status: true,
            },
        });
        return res.status(200).json({
            status: 'success',
            data: profile,
        });
    }
    catch (error) {
        return res
            .status(400)
            .json({ status: 'error', message: error });
    }
}
exports.default = { profile };
//# sourceMappingURL=customer.js.map