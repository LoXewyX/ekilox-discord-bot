import express from "express";
import {
  deleteThreadId,
  getThreadId,
  postMessage,
  resolveTicket,
} from "../controllers/ticketController";

const router = express.Router();

// GET on endpoint - /message/:threadId
router.get("/message/:threadId", getThreadId);

// POST on endpoint - /message
router.post("/message", postMessage);

// DELETE on endpoint - /message/:threadId
router.delete("/message/:threadId", deleteThreadId);

// POST on endpoint - /resolve
router.post("/resolve", resolveTicket);

export default router;
