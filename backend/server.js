"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const authRoutes_1 = __importDefault(require("./src/routes/authRoutes"));
const postRoutes_1 = __importDefault(require("./src/routes/postRoutes"));
const userRoutes_1 = __importDefault(require("./src/routes/userRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json(), (0, cors_1.default)());
app.use(body_parser_1.default.json({ limit: '1000mb' })); // Increase limit to 10mb for JSON requests
app.use(body_parser_1.default.urlencoded({ limit: '1000mb', extended: true }));
const PORT = 3000;
app.use('/auth', authRoutes_1.default);
app.use('/users', userRoutes_1.default);
app.use('/posts', postRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
