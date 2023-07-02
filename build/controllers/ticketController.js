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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveTicket = exports.deleteThreadId = exports.postMessage = exports.getThreadId = void 0;
const discord_js_1 = require("discord.js");
const db_1 = require("../db");
const bot_1 = require("../bot");
const getThreadId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    {
        const { threadId } = req.params;
        if (!threadId)
            return res.status(400).send("Missing threadId");
        try {
            const thread = yield bot_1.client.channels.fetch(threadId);
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
    }
});
exports.getThreadId = getThreadId;
const postMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { threadId, text } = req.body;
    if (!threadId || !text) {
        return res.status(400).send("Missing threadId or text");
    }
    try {
        const thread = yield bot_1.client.channels.fetch(threadId);
        if (!thread || !(thread instanceof discord_js_1.ThreadChannel)) {
            return res.status(404).send("Thread was not found");
        }
        yield thread.send(text);
        return res.status(200).send("Message was sent");
    }
    catch (error) {
        console.error("Error sending message:", error);
        return res.status(500).send("An error occurred while sending the message");
    }
});
exports.postMessage = postMessage;
const deleteThreadId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { threadId } = req.params;
    if (!threadId) {
        return res.status(400).send("Missing threadId");
    }
    try {
        yield (0, db_1.deleteTicket)(threadId);
        const thread = yield bot_1.client.channels.fetch(threadId);
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
});
exports.deleteThreadId = deleteThreadId;
const resolveTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { threadId } = req.body;
    if (!threadId)
        return res.status(400).send("Missing threadId");
    try {
        const thread = yield bot_1.client.channels.fetch(threadId);
        if (!thread || !(thread instanceof discord_js_1.ThreadChannel)) {
            return res.status(404).send("Thread was not found");
        }
        yield thread.send("This conversation is marked as resolved and will be archived");
        yield thread.setArchived(true);
        return res.status(200).send("Thread was resolved");
    }
    catch (error) {
        console.error("Error resolving thread:", error);
        return res.status(500).send("An error occurred while resolving the thread");
    }
});
exports.resolveTicket = resolveTicket;
