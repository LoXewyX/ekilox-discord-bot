"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ticketController_1 = require("../controllers/ticketController");
const router = express_1.default.Router();
// GET on endpoint - /message/:threadId
router.get("/message/:threadId", ticketController_1.getThreadId);
// POST on endpoint - /message
router.post("/message", ticketController_1.postMessage);
// DELETE on endpoint - /message/:threadId
router.delete("/message/:threadId", ticketController_1.deleteThreadId);
// POST on endpoint - /resolve
router.post("/resolve", ticketController_1.resolveTicket);
exports.default = router;
