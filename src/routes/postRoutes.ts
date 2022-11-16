import { Router } from 'express';
import { createPost, deletePost, getAllPost, getPost, updatePost } from '../controllers/postController';

const router = Router();

router.get('/', getAllPost);

router.post('/', createPost);

router.get('/:postId', getPost);

router.put('/:postId', updatePost);

router.delete('/:postId', deletePost);

export default router;