import { Router } from "express";
import {createListing, deleteListingController, updateListingController} from '../controllers/listing_controller.js'
import { verifyToken } from "../utils/verifyToken.js";

const router = Router()

router.post('/create',verifyToken, createListing);
router.delete('/delete/:id',verifyToken, deleteListingController)
router.post('/update/:id',verifyToken, updateListingController)

export default router