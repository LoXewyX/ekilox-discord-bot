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
                    const player = (0, voice_1.createAudioPlayer)();
                    player.on(voice_1.AudioPlayerStatus.Playing, () => {
                        console.log("The audio player has started playing!");
                    });
                    player.on(voice_1.AudioPlayerStatus.Idle, () => {
                        console.log("The audio player has stopped playing!");
                    });
                    player.on("error", (error) => {
                        console.error(`Error: ${error.message}`);
                    });
                    const connection = (0, voice_1.joinVoiceChannel)({
                        channelId: voiceChannel.id,
                        guildId: interaction.guildId,
                        adapterCreator: interaction.guild.voiceAdapterCreator,
                    });
                    const resource = (0, voice_1.createAudioResource)("D:\\Documents\\GitHub\\Ekilox-discord-bot\\src\\public\\Imaginary.mp3", { inlineVolume: true });
                    resource.volume.setVolume(1);
                    yield interaction.reply("Streaming on voice channel `" + voiceChannel.name + "`");
                    // Subscribe the connection to the audio player (will play audio on the voice connection)
                    const subscription = connection.subscribe(player);
                    player.play(resource);
                    // subscription could be undefined if the connection is destroyed!
                    if (subscription) {
                        // Unsubscribe when the audio finishes playing
                        player.on(voice_1.AudioPlayerStatus.Idle, () => {
                            subscription.unsubscribe();
                            console.log("Unsubscribed from the voice connection.");
                        });
                        // Handle any errors that occur during playback
                        player.on("error", (error) => {
                            console.error(`Error: ${error.message}`);
                            subscription.unsubscribe();
                            console.log("Unsubscribed from the voice connection due to an error.");
                        });
                    }
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
