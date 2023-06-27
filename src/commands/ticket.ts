import {
    SlashCommandBuilder,
    CommandInteraction,
    Client,
    TextChannel,
    ChannelType,
  } from "discord.js";
  import { createTicket } from "../db";
  
  const data = new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Creates a new ticket.")
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
  
      const threadId = Date.now();

      const thread = await (channel as TextChannel).threads.create({
        name: `support-${threadId}`,
        reason: `Support ticket ${threadId}`,
      });
  
      const problemDescription = String(
        interaction.options.data.find((option) => option.name === "description")
          ?.value
      );
      const user = interaction.user;
      thread.send(`**User: <@${user.id}>**\n**Problem**: ${problemDescription}`);
  
      await createTicket(thread.id, problemDescription);
      
      await interaction.reply(`Thread ${threadId} was opened for user ${user.id}`);
    } catch (error) {
      console.error("Error executing 'ticket' command:", error);
      await interaction.reply("An error occurred while executing the command.");
    }
  }
  
  export { data, execute };
  