import { Request, Response } from 'express';
import fs from 'fs';
import { Post } from '../models/Post';

const POSTS_FILE_PATH = 'posts.json';

// Read posts from file
const readPostsFromFile = (): Post[] => {
    try {
        const postsData = fs.readFileSync(POSTS_FILE_PATH, 'utf-8');
        return JSON.parse(postsData) as Post[];
    } catch (error) {
        console.error('Error reading posts from file:', error);
        return [];
    }
};

// Write posts to file
const writePostsToFile = (posts: Post[]) => {
    fs.writeFile(POSTS_FILE_PATH, JSON.stringify(posts), (err) => {
        if (err) {
            console.error('Error writing posts to file:', err);
        } else {
            console.log('Posts saved to file successfully');
        }
    });
};

// Create a new comment
export const createComment = (req: Request, res: Response) => {
    const postId = req.params.id;
    const { username,text, commenter } = req.body;

    const posts = readPostsFromFile();
    const post = posts.find((post) => post.id === parseInt(postId));

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    const newComment:any = { username, text, commenter };
    post.comments.push(newComment);

    writePostsToFile(posts);

    res.status(201).json({ message: 'Comment added successfully', comment: newComment });
};

// Update a comment
export const updateComment = (req: Request, res: Response) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const { text } = req.body;

    const posts = readPostsFromFile();
    const post = posts.find((post) => post.id === parseInt(postId));

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    const comment:any = post.comments.find((comment) => comment.id === parseInt(commentId));

    if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
    }

    comment.text = text;

    writePostsToFile(posts);

    res.json({ message: 'Comment updated successfully', comment });
};

// Delete a comment
export const deleteComment = (req: Request, res: Response) => {
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

