import express from 'express';
import { getUsers, getUserByUsername, deleteAccount, getUserComments } from '../controllers/userController';

const router = express.Router();

router.get('/', getUsers);
router.get('/:username', getUserByUsername);
router.delete('/:username', deleteAccount);
router.get('/:username/comments', getUserComments);

export default router;
