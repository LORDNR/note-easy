"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../utils");
const config_1 = __importDefault(require("../config"));
async function register(req, res) {
    try {
        (0, utils_1.reqValidation)(req);
        const { email, password, firstname, lastname } = req.body;
        const customer = await utils_1.prisma.customer.create({
            data: {
                email: email.toLowerCase(),
                password: bcryptjs_1.default.hashSync(password, await bcryptjs_1.default.genSalt(10)),
                firstname,
                lastname,
            },
        });
        await (0, utils_1.sendVerifyEmail)(email, customer.id, 'To get started with Verify Email, please click here:', '24h');
        return res.status(201).json({
            status: 'success',
            message: 'Register Success. Please Verify Email',
            data: { customer_id: customer.id },
        });
    }
    catch (error) {
        if (error.message.code === 'P2002') {
            throw 'Email already exists.';
        }
        return res
            .status(400)
            .json({ status: 'error', message: error });
    }
}
async function login(req, res) {
    try {
        (0, utils_1.reqValidation)(req);
        const { email } = req.body;
        const customer = await utils_1.prisma.customer.findUnique({
            where: {
                email: email.toLowerCase(),
            },
        });
        if (!customer) {
            throw 'Invalid email or password';
        }
        const validated = await bcryptjs_1.default.compare(req.body.password, customer.password);
        if (!validated) {
            throw 'Invalid email or password';
        }
        if (customer.status === 'Unverified') {
            await (0, utils_1.sendVerifyEmail)(email, customer.id, 'To get started with Verify Email, please click here:', '24h');
            return res.status(200).json({
                status: 'success',
                message: 'Please Verify your email',
            });
        }
        const token = jsonwebtoken_1.default.sign({
            id: customer.id,
            email: customer.email,
        }, config_1.default.environments.SECRET, {});
        return res.status(200).json({
            status: 'success',
            data: {
                token,
            },
        });
    }
    catch (error) {
        return res
            .status(400)
            .json({ status: 'error', message: error });
    }
}
async function callUpdateStatus(req, res) {
    try {
        (0, utils_1.reqValidation)(req);
        const { token } = req.params;
        const secret = config_1.default.environments.SECRET;
        let decoded = jsonwebtoken_1.default.verify(token, secret);
        const customerId = decoded.customerId;
        if (await updateStatus(customerId)) {
            return res.status(200).json({
                status: 'success',
                message: 'Verify email success',
            });
        }
    }
    catch (error) {
        return res
            .status(400)
            .json({ status: 'error', message: error });
    }
}
async function updateStatus(customerId) {
    try {
        await utils_1.prisma.customer.update({
            where: {
                id: customerId,
            },
            data: {
                status: 'Verified',
            },
        });
        return true;
    }
    catch (error) {
        console.log(`updateStatus: ${error}`);
        return false;
    }
}
exports.default = { register, login, callUpdateStatus };
//# sourceMappingURL=auth.js.map