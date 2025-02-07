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
const db_1 = require("../db");
const data = new discord_js_1.SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Creates an incident ticket.")
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
            const threadId = Date.now();
            const thread = yield channel.threads.create({
                name: `support-${threadId}`,
                reason: `Support ticket ${threadId}`,
            });
            const problemDescription = String((_a = interaction.options.data.find((option) => option.name === "description")) === null || _a === void 0 ? void 0 : _a.value);
            const user = interaction.user;
            thread.send(`**User: <@${user.id}>**\n**Problem**: ${problemDescription}`);
            yield (0, db_1.createTicket)(thread.id, problemDescription);
            yield interaction.reply(`Thread ${threadId} was opened for user ${user.id}`);
        }
        catch (error) {
            console.error("Error executing 'ticket' command:", error);
            yield interaction.reply("An error occurred while executing the command.");
        }
    });
}
exports.execute = execute;
