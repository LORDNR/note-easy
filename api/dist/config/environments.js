"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environments = {
    PORT: process.env.PORT || 3000,
    SECRET: String(process.env.SECRET),
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD,
    URL_WEB: process.env.URL_WEB,
};
exports.default = environments;
//# sourceMappingURL=environments.js.map