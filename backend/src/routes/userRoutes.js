"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.get('/', userController_1.getUsers);
router.get('/:username', userController_1.getUserByUsername);
router.delete('/:username', userController_1.deleteAccount);
router.get('/:username/comments', userController_1.getUserComments);
exports.default = router;
