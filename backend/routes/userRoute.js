import express from 'express';
import { LoginUser, registerUser } from '../controllers/userController.js';
import { validateRegister } from '../middlewares/validateUser.js';

const router = express.Router();

router.post('/register',validateRegister, registerUser);
router.post('/login',LoginUser);

export default router;