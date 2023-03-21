"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Hello World',
    });
});
app.use('/api', routes_1.default);
app.listen(config_1.default.environments.PORT, () => console.log(`http://localhost:${config_1.default.environments.PORT}`));
//# sourceMappingURL=index.js.map