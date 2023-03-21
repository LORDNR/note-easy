"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailgen_1 = __importDefault(require("mailgen"));
async function sendVerifyEmail(email, customerId, instructions, tokenExp = '30d') {
    const token = jsonwebtoken_1.default.sign({
        customerId: customerId,
    }, config_1.default.environments.SECRET, { expiresIn: tokenExp });
    const text = 'Verify Email';
    const subject = 'Verify your Email';
    const link = `${config_1.default.environments.URL_WEB}?token=${token}`;
    try {
        let transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: config_1.default.environments.EMAIL,
                pass: config_1.default.environments.PASSWORD,
            },
        });
        let Mailgenerator = new mailgen_1.default({
            theme: 'default',
            product: {
                name: 'Note Easy',
                link: 'http://localhost:5173/',
            },
        });
        //body of the email
        let emails = {
            body: {
                name: email,
                intro: 'Welcome to Note Easy.',
                action: {
                    instructions: instructions,
                    button: {
                        color: '#22BC66',
                        text: text,
                        link: link,
                    },
                },
                outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
            },
        };
        // Generate an HTML email with the provided contents
        let emailBody = Mailgenerator.generate(emails);
        let message = {
            from: config_1.default.environments.EMAIL,
            to: email,
            subject: subject,
            html: emailBody,
        };
        //send mail
        await transporter.sendMail(message);
    }
    catch (error) {
        throw error;
    }
}
exports.default = sendVerifyEmail;
//# sourceMappingURL=sendVerifyEmail.js.map