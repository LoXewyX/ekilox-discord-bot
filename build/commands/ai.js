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
exports.execute = exports.data = void 0;
const discord_js_1 = require("discord.js");
const data = new discord_js_1.SlashCommandBuilder()
    .setName("img")
    .setDescription("Replies you with your name.")
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
                const amount = interaction.options.get("amount").value;
                try {
                    const response = yield fetch("/api/posts", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ prompt, amount }),
                    });
                    if (!response.ok) {
                        throw new Error("Failed to create post");
                    }
                    const data = yield response.json();
                    yield interaction.reply({ files: [data.data] });
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
