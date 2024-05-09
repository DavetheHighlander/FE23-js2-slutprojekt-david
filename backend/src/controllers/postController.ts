import { Request, Response } from 'express';
import { Post } from '../models/Post';

const posts: any[] = []; // Array to store blog posts
import fs from 'fs';
const POSTS_FILE_PATH = 'posts.json';
const readPostsFromFile = (): Post[] => {
    try {
        const postsData = fs.readFileSync(POSTS_FILE_PATH, 'utf-8');
        return JSON.parse(postsData) as Post[];
    } catch (error) {
        console.error('Error reading posts from file:', error);
        return [];
    }
};

export const createPost = (req: Request, res: Response) => {
    //console.log(JSON.stringify(req.body))

    const { title, content, author, createdAt, image } = req.body;
    const newPost = {id: Date.now(), title, content, author, comments: [], createdAt: Date.now(), image };
    // Push the new post to your posts array (assuming you have defined it somewhere)
    posts.push(newPost);

    // Save the updated posts array to a JSON file
    fs.writeFile('posts.json', JSON.stringify(posts), (err) => {
        if (err) {
            console.error('Error writing posts to file:', err);
            res.status(500).json({ message: 'Error saving post to file' });
        } else {
            console.log('Post saved to file successfully');
            res.status(201).json({ message: 'Post created successfully', post: newPost });
        }
    });
};


export const getPosts = (req: Request, res: Response) => {
    const posts = readPostsFromFile();
    //console.log(posts)
    res.json(posts);
};
export const getPost = (req: Request, res: Response) => {
    const postId = req.params.id; // Extract post ID from request parameters
    const posts = readPostsFromFile();
    const post = posts.find(post => post.id === parseInt(postId));

    if (post) {
        res.json(post); // Send the found post as response
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
};