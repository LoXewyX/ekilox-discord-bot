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
    .setName("nuke")
    .setDescription("Clean up messages in a text channel")
    .addChannelOption((option) => option
    .setName("channel")
    .setDescription("Select the text channel.")
    .setRequired(true))
    .addIntegerOption((option) => option
    .setName("amount")
    .setDescription("Number of messages to clean")
    .setRequired(true)
    .addChoices({ name: "All", value: 0 }, { name: "1", value: 1 }, { name: "10", value: 10 }, { name: "25", value: 25 }, { name: "50", value: 50 }, { name: "100", value: 100 }));
exports.data = data;
function execute(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (interaction.isCommand() && interaction.commandName === "nuke") {
                const channel = interaction.options.get("channel")
                    .channel;
                if (!channel || channel.type !== discord_js_1.ChannelType.GuildText) {
                    yield interaction.reply("Please provide a valid text channel.");
                    return;
                }
                const amount = interaction.options.get("amount").value;
                console.log(amount);
                if (amount && (amount < 0 || amount > 100)) {
                    yield interaction.reply("Please provide a valid amount between 0 and 100.");
                    return;
                }
                let messages;
                if (amount === 0) {
                    messages = yield channel.messages.fetch();
                }
                else {
                    messages = yield channel.messages.fetch({ limit: amount });
                }
                const filteredMessages = messages.filter((msg) => !msg.pinned);
                yield channel.bulkDelete(filteredMessages);
                yield interaction.reply({ content: `Successfully deleted ${filteredMessages.size} messages.`, ephemeral: true });
            }
        }
        catch (error) {
            console.error("Error executing 'nuke' command:", error);
            yield interaction.reply("An error occurred while executing the command.");
        }
    });
}
exports.execute = execute;
