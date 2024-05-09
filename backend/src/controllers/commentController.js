"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.createComment = void 0;
const fs_1 = __importDefault(require("fs"));
const POSTS_FILE_PATH = 'posts.json';
// Read posts from file
const readPostsFromFile = () => {
    try {
        const postsData = fs_1.default.readFileSync(POSTS_FILE_PATH, 'utf-8');
        return JSON.parse(postsData);
    }
    catch (error) {
        console.error('Error reading posts from file:', error);
        return [];
    }
};
// Write posts to file
const writePostsToFile = (posts) => {
    fs_1.default.writeFile(POSTS_FILE_PATH, JSON.stringify(posts), (err) => {
        if (err) {
            console.error('Error writing posts to file:', err);
        }
        else {
            console.log('Posts saved to file successfully');
        }
    });
};
// Create a new comment
const createComment = (req, res) => {
    const postId = req.params.id;
    const { username, text, commenter } = req.body;
    const posts = readPostsFromFile();
    const post = posts.find((post) => post.id === parseInt(postId));
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    const newComment = { username, text, commenter };
    post.comments.push(newComment);
    writePostsToFile(posts);
    res.status(201).json({ message: 'Comment added successfully', comment: newComment });
};
exports.createComment = createComment;
// Update a comment
const updateComment = (req, res) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const { text } = req.body;
    const posts = readPostsFromFile();
    const post = posts.find((post) => post.id === parseInt(postId));
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    const comment = post.comments.find((comment) => comment.id === parseInt(commentId));
    if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
    }
    comment.text = text;
    writePostsToFile(posts);
    res.json({ message: 'Comment updated successfully', comment });
};
exports.updateComment = updateComment;
// Delete a comment
const deleteComment = (req, res) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const posts = readPostsFromFile();
    const post = posts.find((post) => post.id === parseInt(postId));
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    const index = post.comments.findIndex((comment) => comment.id === parseInt(commentId));
    if (index === -1) {
        return res.status(404).json({ message: 'Comment not found' });
    }
    post.comments.splice(index, 1);
    writePostsToFile(posts);
    res.json({ message: 'Comment deleted successfully' });
};
exports.deleteComment = deleteComment;
