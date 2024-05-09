import express from 'express';
import { createPost, getPost, getPosts } from '../controllers/postController';
import { createComment, deleteComment , updateComment } from '../controllers/commentController';

const router = express.Router();

router.post('/', createPost);
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/:id/comments', createComment);
router.put('/:postId/comments/:commentId', updateComment);
router.delete('/:postId/comments/:commentId', deleteComment);

export default router;
