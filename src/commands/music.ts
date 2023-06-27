import {
    ChannelType,
    CommandInteraction,
    SlashCommandBuilder,
  } from "discord.js";
  import {
    createAudioPlayer,
    createAudioResource,
    joinVoiceChannel,
  } from "@discordjs/voice";
  import http from "http";
  import { PassThrough, Readable } from "stream";
  
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
  
          const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guildId!,
            adapterCreator: interaction.guild!.voiceAdapterCreator,
          });
  
          const player = createAudioPlayer();
  
          connection.subscribe(player);
  
          const audioUrl = "localhost:3000/public/freedom.mp3";
  
          const stream = await getReadableStreamFromUrl(audioUrl);
  
          const resource = createAudioResource(stream);
  
          player.play(resource);
  
          await interaction.reply("Playing audio in the voice channel.");
        }
      }
    } catch (error) {
      console.error("Error executing 'music' command:", error);
      await interaction.reply("An error occurred while executing the command.");
    }
  }
  
  async function getReadableStreamFromUrl(url: string): Promise<Readable> {
    return new Promise<Readable>((resolve, reject) => {
      https.get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Request failed with status code ${response.statusCode}`));
          return;
        }
  
        const stream = response.pipe(new PassThrough());
        resolve(stream);
      })
      .on("error", reject);
    });
  }
  
  export { data, execute };
  