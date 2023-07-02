"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { CLIENT_ID, GUILD_ID, DISCORD_TOKEN, MONGO_URI, OPENAI_API_KEY } = process.env;
if (!CLIENT_ID || !GUILD_ID || !DISCORD_TOKEN || !MONGO_URI || !OPENAI_API_KEY)
    throw new Error("Environment variables are missing.");
const discord = {
    CLIENT_ID: CLIENT_ID,
    GUILD_ID: GUILD_ID,
    DISCORD_TOKEN: DISCORD_TOKEN,
    OPENAI_API_KEY: OPENAI_API_KEY,
};
const mongodb = {
    MONGO_URI: MONGO_URI,
};
const openai = {
    OPENAI_API_KEY: OPENAI_API_KEY,
};
exports.default = { discord, mongodb, openai };
