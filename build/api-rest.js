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
    // DELETE on endpoint - /message/:messageId
    app.delete("/message/:messageId", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { threadId } = req.query;
        const messageId = req.params.messageId;
        if (!threadId) {
            return res.status(400).send("Missing threadId");
        }
        try {
            const thread = yield client.channels.fetch(threadId);
            if (!thread || !(thread instanceof discord_js_1.ThreadChannel)) {
                return res.status(404).send("Thread was not found");
            }
            const message = yield thread.messages.fetch(messageId);
            if (!message) {
                return res.status(404).send("Message was not found");
            }
            yield message.delete();
            return res.status(200).send("Message was deleted");
        }
        catch (error) {
            console.error("Error deleting message:", error);
            return res
                .status(500)
                .send("An error occurred while deleting the message");
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
