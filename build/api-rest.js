"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiRest = void 0;
const discord_js_1 = require("discord.js");
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
function createApiRest(client) {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    // GET on endpoint - /message
    app.get("/message", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { threadId } = req.query;
        if (!threadId)
            return res.status(400).send("Missing threadId");
        try {
            const thread = yield client.channels.fetch(threadId);
            if (!thread || !(thread instanceof discord_js_1.ThreadChannel)) {
                return res.status(404).send("Thread was not found");
            }
            const messages = yield thread.messages.fetch();
            return res.status(200).json(messages || []);
        }
        catch (error) {
            console.error("Error fetching messages:", error);
            return res.status(500).send("An error occurred while fetching messages");
        }
    }));
    // POST on endpoint - /message
    app.post("/message", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { threadId, text } = req.body;
        if (!threadId || !text) {
            return res.status(400).send("Missing threadId or text");
        }
        try {
            const thread = yield client.channels.fetch(threadId);
            if (!thread || !(thread instanceof discord_js_1.ThreadChannel)) {
                return res.status(404).send("Thread was not found");
            }
            yield thread.send(text);
            return res.status(200).send("Message was sent");
        }
        catch (error) {
            console.error("Error sending message:", error);
            return res
                .status(500)
                .send("An error occurred while sending the message");
        }
    }));
    // DELETE on endpoint - /message/:threadId
    app.delete("/message/:threadId", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { threadId } = req.params;
        if (!threadId) {
            return res.status(400).send("Missing threadId");
        }
        try {
            yield (0, db_1.deleteTicket)(threadId);
            const thread = yield client.channels.fetch(threadId);
            if (!thread || !(thread instanceof discord_js_1.ThreadChannel)) {
                return res.status(404).send("Thread was not found");
            }
            yield thread.delete();
            console.log("Thread deleted successfully!");
            return res.status(200).send("Ticket and thread were deleted");
        }
        catch (error) {
            console.error("Error deleting ticket and thread:", error);
            return res
                .status(500)
                .send("An error occurred while deleting the ticket and thread");
        }
    }));
    // POST on endpoint - /resolve
    app.post("/resolve", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { threadId } = req.body;
        if (!threadId)
            return res.status(400).send("Missing threadId");
        try {
            const thread = yield client.channels.fetch(threadId);
            if (!thread || !(thread instanceof discord_js_1.ThreadChannel)) {
                return res.status(404).send("Thread was not found");
            }
            yield thread.send("This conversation is marked as resolved and will be archived");
            yield thread.setArchived(true);
            return res.status(200).send("Thread was resolved");
        }
        catch (error) {
            console.error("Error resolving thread:", error);
            return res
                .status(500)
                .send("An error occurred while resolving the thread");
        }
    }));
    return app;
}
exports.createApiRest = createApiRest;
