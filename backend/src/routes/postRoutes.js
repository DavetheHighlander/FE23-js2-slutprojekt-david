"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
const commentController_1 = require("../controllers/commentController");
const router = express_1.default.Router();
router.post('/', postController_1.createPost);
router.get('/', postController_1.getPosts);
router.get('/:id', postController_1.getPost);
router.post('/:id/comments', commentController_1.createComment);
router.put('/:postId/comments/:commentId', commentController_1.updateComment);
router.delete('/:postId/comments/:commentId', commentController_1.deleteComment);
exports.default = router;
