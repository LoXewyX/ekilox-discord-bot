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
    .setName("id")
    .setDescription("Shows the profile data from a specific user.")
    .addUserOption((option) => option.setName("user").setDescription("Select the user.").setRequired(true));
exports.data = data;
function execute(interaction) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = interaction.options.getUser("user");
            const member = (_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.members.cache.get(user.id);
            const id = user.id;
            const name = user.username;
            const guildStatus = member ? "Member" : "Not a member";
            const roles = member
                ? member.roles.cache.map((role) => role.name).join(", ")
                : "N/A";
            const memberSince = member ? (_b = member.joinedAt) === null || _b === void 0 ? void 0 : _b.toLocaleDateString() : "N/A";
            const presence = member === null || member === void 0 ? void 0 : member.presence;
            const about = ((_d = (_c = presence === null || presence === void 0 ? void 0 : presence.activities) === null || _c === void 0 ? void 0 : _c.find((activity) => activity.type === discord_js_1.ActivityType.Custom ||
                activity.type === discord_js_1.ActivityType.Playing)) === null || _d === void 0 ? void 0 : _d.name) || "N/A";
            const userData = `
    **User Data**
    ID: \`${id}\`
    Name: ${name}
    Guild Status: ${guildStatus}
    About: ${about}
    Roles: ${roles}
    Member Since: ${memberSince}
  `;
            yield interaction.reply(userData);
        }
        catch (error) {
            console.error("Error executing 'id' command:", error);
            yield interaction.reply("An error occurred while executing the command.");
        }
    });
}
exports.execute = execute;
