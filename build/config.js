"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { CLIENT_ID, GUILD_ID, DISCORD_TOKEN, MONGO_URI } = process.env;
if (!CLIENT_ID || !GUILD_ID || !DISCORD_TOKEN)
    throw new Error("Environment variables are missing.");
const discord = {
    CLIENT_ID: CLIENT_ID,
    GUILD_ID: GUILD_ID,
    DISCORD_TOKEN: DISCORD_TOKEN,
};
const mongodb = {
    MONGO_URI: MONGO_URI
};
exports.default = { discord, mongodb };
