import {
  ChannelType,
  CommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} from "@discordjs/voice";

const data = new SlashCommandBuilder()
  .setName("music")
  .setDescription("Joins the music channel and plays music.")
  .addChannelOption((option) =>
    option
      .setName("channel")
      .setDescription("Select the audio channel.")
      .setRequired(true)
      .addChannelTypes(ChannelType.GuildVoice)
  );

async function execute(interaction: CommandInteraction) {
  try {
    if (interaction.isCommand()) {
      if (interaction.commandName === "music") {
        const voiceChannel = interaction.options.get("channel")!.channel;

        if (!voiceChannel) {
          await interaction.reply("Please provide a valid voice channel.");
          return;
        }

        const player = createAudioPlayer();

        player.on(AudioPlayerStatus.Playing, () => {
          console.log("The audio player has started playing!");
        });

        player.on(AudioPlayerStatus.Idle, () => {
          console.log("The audio player has stopped playing!");
        });

        player.on("error", (error) => {
          console.error(`Error: ${error.message}`);
        });

        const connection = joinVoiceChannel({
          channelId: voiceChannel.id,
          guildId: interaction.guildId!,
          adapterCreator: interaction.guild!.voiceAdapterCreator,
        });

        const resource = createAudioResource(
          "D:\\Documents\\GitHub\\Ekilox-discord-bot\\src\\public\\Jeremy Blake - Through The Crystal.mp3",
          { inlineVolume: true }
        );
        resource.volume!.setVolume(1);

        await interaction.reply(
          "Streaming on voice channel `" + voiceChannel.name + "`"
        );

        // Subscribe the connection to the audio player (will play audio on the voice connection)
        const subscription = connection.subscribe(player);
        player.play(resource);

        // subscription could be undefined if the connection is destroyed!
        if (subscription) {
          // Unsubscribe when the audio finishes playing
          player.on(AudioPlayerStatus.Idle, () => {
            subscription.unsubscribe();
            connection.disconnect();
            console.log("Unsubscribed from the voice connection.");
          });

          // Handle any errors that occur during playback
          player.on("error", (error) => {
            console.error(`Error: ${error.message}`);
            subscription.unsubscribe();
            console.log(
              "Unsubscribed from the voice connection due to an error."
            );
          });
        }
      }
    }
  } catch (error) {
    console.error("Error executing 'music' command:", error);
    await interaction.reply("An error occurred while executing the command.");
  }
}

export { data, execute };
