"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserComments = exports.deleteAccount = exports.getUserByUsername = exports.getUsers = void 0;
const fs_1 = __importDefault(require("fs"));
// Läs in användare från JSON-filen
const users = JSON.parse(fs_1.default.readFileSync('users.json', 'utf-8'));
let currentUser = null;
const getUsers = (req, res) => {
    res.json(users.map(user => ({ username: user.username })));
};
exports.getUsers = getUsers;
const getUserByUsername = (req, res) => {
    const { username } = req.params;
    const user = users.find(user => user.username === username);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
    }
    else {
        res.json(user);
    }
};
exports.getUserByUsername = getUserByUsername;
const deleteAccount = (req, res) => {
    const { username } = req.params;
    if (currentUser && currentUser.username === username) {
        // Ta bort användaren från databasen
        const index = users.findIndex(user => user.username === username);
        users.splice(index, 1);
        // Logga ut användaren
        currentUser = null;
        res.json({ message: 'Account deleted successfully' });
    }
    else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};
exports.deleteAccount = deleteAccount;
const getUserComments = (req, res) => {
    const { username } = req.params;
    const user = users.find(user => user.username === username);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
    }
    else {
        res.json(user); // Returnerar de tre senaste kommentarerna
    }
};
exports.getUserComments = getUserComments;
