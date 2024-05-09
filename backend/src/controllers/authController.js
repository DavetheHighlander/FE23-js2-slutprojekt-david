"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = void 0;
const fs_1 = __importDefault(require("fs"));
// Läs in användare från JSON-filen
const users = JSON.parse(fs_1.default.readFileSync('users.json', 'utf-8'));
let currentUser = null;
const login = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }
    currentUser = user;
    console.log(user);
    res.json({ message: 'Login successful', user });
};
exports.login = login;
const logout = (req, res) => {
    currentUser = null;
    res.json({ message: 'Logout successful' });
};
exports.logout = logout;
