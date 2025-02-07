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
exports.execute = exports.data = void 0;
const axios_1 = __importDefault(require("axios"));
const querystring_1 = __importDefault(require("querystring"));
const discord_js_1 = require("discord.js");
const data = new discord_js_1.SlashCommandBuilder()
    .setName("img")
    .setDescription("Generates AI images.")
    .addStringOption((option) => option
    .setName("prompt")
    .setDescription("Enter your text prompt.")
    .setRequired(true))
    .addStringOption((option) => option
    .setName("size")
    .setDescription("Enter your image size.")
    .setRequired(true)
    .addChoices({ name: "Small", value: "small" }, { name: "Medium", value: "medium" }, { name: "Large", value: "large" }));
exports.data = data;
function execute(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (interaction.isCommand() && interaction.commandName === "img") {
                const prompt = interaction.options.get("prompt").value;
                const size = interaction.options.get("size").value;
                try {
                    const params = querystring_1.default.stringify({ prompt, size });
                    const response = yield axios_1.default.post("https://ekilox-api.onrender.com/ai/generate/image", params, {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    });
                    if (response.status !== 200) {
                        throw new Error("Failed to create post");
                    }
                    const responseData = response.data;
                    yield interaction.reply({ files: [responseData.data] });
                }
                catch (error) {
                    console.error(error);
                }
            }
        }
        catch (error) {
            console.error("Error executing 'img' command:", error);
            yield interaction.reply("An error occurred while executing the command.");
        }
    });
}
exports.execute = execute;
