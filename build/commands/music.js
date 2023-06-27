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
const voice_1 = require("@discordjs/voice");
const stream_1 = require("stream");
const data = new discord_js_1.SlashCommandBuilder()
    .setName("music")
    .setDescription("Joins the music channel and plays music.")
    .addChannelOption((option) => option
    .setName("channel")
    .setDescription("Select the audio channel.")
    .setRequired(true)
    .addChannelTypes(discord_js_1.ChannelType.GuildVoice));
exports.data = data;
function execute(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (interaction.isCommand()) {
                if (interaction.commandName === "music") {
                    const voiceChannel = interaction.options.get("channel").channel;
                    if (!voiceChannel) {
                        yield interaction.reply("Please provide a valid voice channel.");
                        return;
                    }
                    const connection = (0, voice_1.joinVoiceChannel)({
                        channelId: voiceChannel.id,
                        guildId: interaction.guildId,
                        adapterCreator: interaction.guild.voiceAdapterCreator,
                    });
                    const player = (0, voice_1.createAudioPlayer)();
                    connection.subscribe(player);
                    const audioUrl = "localhost:3000/public/freedom.mp3";
                    const stream = yield getReadableStreamFromUrl(audioUrl);
                    const resource = (0, voice_1.createAudioResource)(stream);
                    player.play(resource);
                    yield interaction.reply("Playing audio in the voice channel.");
                }
            }
        }
        catch (error) {
            console.error("Error executing 'music' command:", error);
            yield interaction.reply("An error occurred while executing the command.");
        }
    });
}
exports.execute = execute;
function getReadableStreamFromUrl(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            https.get(url, (response) => {
                if (response.statusCode !== 200) {
                    reject(new Error(`Request failed with status code ${response.statusCode}`));
                    return;
                }
                const stream = response.pipe(new stream_1.PassThrough());
                resolve(stream);
            })
                .on("error", reject);
        });
    });
}
