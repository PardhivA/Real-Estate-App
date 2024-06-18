import { Router } from "express";
import {createListing, deleteListingController} from '../controllers/listing_controller.js'
import { verifyToken } from "../utils/verifyToken.js";

const router = Router()

router.post('/create',verifyToken, createListing);
router.delete('/delete/:id',verifyToken, deleteListingController)

export default router