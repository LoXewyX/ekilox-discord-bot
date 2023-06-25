import {
    SlashCommandBuilder,
    CommandInteraction,
    Client,
    TextChannel,
    ChannelType,
  } from "discord.js";
  import { createTicket } from "../firebase";
  
  const data = new SlashCommandBuilder()
    .setName("help")
    .setDescription("Creates a new help ticket.")
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Describe your problem")
        .setRequired(true)
    );
  
  async function execute(interaction: CommandInteraction, client: Client) {
    try {
      if (!interaction.channelId) return;
  
      const channel = await client.channels.fetch(interaction.channelId);
      if (!channel || channel.type !== ChannelType.GuildText) return;
  
      const thread = await (channel as TextChannel).threads.create({
        name: `support-${Date.now()}`,
        reason: `Support ticket ${Date.now()}`,
      });
  
      const problemDescription = String(
        interaction.options.data.find((option) => option.name === "description")
          ?.value
      );
      const user = interaction.user;
      thread.send(`**User: <@${user.id}>**\**Problem**: ${problemDescription}`);
  
      await createTicket(thread.id, problemDescription);
  
      await interaction.reply("Help is on the way");
    } catch (error) {
      console.error("Error executing 'help' command:", error);
      await interaction.reply("An error occurred while executing the command.");
    }
  }
  
  export { data, execute };
  