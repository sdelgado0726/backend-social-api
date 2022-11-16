import { Router } from 'express';
import { createUser, loginUser, updateUser, getUser } from '../controllers/userController';

const router = Router();

router.post('/', createUser);

router.post('/login', loginUser);

router.put('/:userId', updateUser);

router.get('/:userId', getUser)




export default router;