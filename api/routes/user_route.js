import express from 'express'
import userController, { updateUserController, deleteUserController, userListingsController } from '../controllers/user_controller.js';
import { verifyToken } from '../utils/verifyToken.js';
const router = express.Router();

router.get('/test', userController)
router.post('/update/:id', verifyToken ,updateUserController)
router.delete('/delete/:id',verifyToken, deleteUserController)
router.get('/listings/:id',verifyToken, userListingsController)
export default router;