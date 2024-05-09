"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPost = exports.getPosts = exports.createPost = void 0;
const posts = []; // Array to store blog posts
const fs_1 = __importDefault(require("fs"));
const POSTS_FILE_PATH = 'posts.json';
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
const createPost = (req, res) => {
    //console.log(JSON.stringify(req.body))
    const { title, content, author, createdAt, image } = req.body;
    const newPost = { id: Date.now(), title, content, author, comments: [], createdAt: Date.now(), image };
    // Push the new post to your posts array (assuming you have defined it somewhere)
    posts.push(newPost);
    // Save the updated posts array to a JSON file
    fs_1.default.writeFile('posts.json', JSON.stringify(posts), (err) => {
        if (err) {
            console.error('Error writing posts to file:', err);
            res.status(500).json({ message: 'Error saving post to file' });
        }
        else {
            console.log('Post saved to file successfully');
            res.status(201).json({ message: 'Post created successfully', post: newPost });
        }
    });
};
exports.createPost = createPost;
const getPosts = (req, res) => {
    const posts = readPostsFromFile();
    //console.log(posts)
    res.json(posts);
};
exports.getPosts = getPosts;
const getPost = (req, res) => {
    const postId = req.params.id; // Extract post ID from request parameters
    const posts = readPostsFromFile();
    const post = posts.find(post => post.id === parseInt(postId));
    if (post) {
        res.json(post); // Send the found post as response
    }
    else {
        res.status(404).json({ message: 'Post not found' });
    }
};
exports.getPost = getPost;
