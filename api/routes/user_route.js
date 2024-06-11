import express from 'express'
import userController, { updateUserController } from '../controllers/user_controller.js';
import { verifyToken } from '../utils/verifyToken.js';
const router = express.Router();

router.get('/test', userController)
router.post('/update/:id', verifyToken ,updateUserController)
export default router;