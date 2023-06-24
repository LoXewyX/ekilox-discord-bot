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
const firebase_1 = require("../firebase");
const data = new discord_js_1.SlashCommandBuilder()
    .setName("help")
    .setDescription("Creates a new help ticket.")
    .addStringOption((option) => option
    .setName("description")
    .setDescription("Describe your problem")
    .setRequired(true));
exports.data = data;
function execute(interaction, client) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!interaction.channelId)
                return;
            const channel = yield client.channels.fetch(interaction.channelId);
            if (!channel || channel.type !== discord_js_1.ChannelType.GuildText)
                return;
            const thread = yield channel.threads.create({
                name: `support-${Date.now()}`,
                reason: `Support ticket ${Date.now()}`,
            });
            const problemDescription = String((_a = interaction.options.data.find((option) => option.name === "description")) === null || _a === void 0 ? void 0 : _a.value);
            const user = interaction.user;
            thread.send(`**User: <@${user.id}>**
  **Problem**: ${problemDescription}`);
            yield (0, firebase_1.createTicket)(thread.id, problemDescription);
            yield interaction.reply("Help is on the way");
        }
        catch (error) {
            console.error("Error executing 'help' command:", error);
            yield interaction.reply("An error occurred while executing the command.");
        }
    });
}
exports.execute = execute;
