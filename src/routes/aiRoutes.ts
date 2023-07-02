import express from "express";
import { generateImage } from '../controllers/aiController'

const router = express.Router();

router.post('/generate/image', generateImage);

export default router;