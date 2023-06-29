import {
  CommandInteraction,
  SlashCommandBuilder,
  ChannelType,
  TextChannel,
} from "discord.js";

const data = new SlashCommandBuilder()
  .setName("nuke")
  .setDescription("Clean up messages in a text channel")
  .addChannelOption((option) =>
    option
      .setName("channel")
      .setDescription("Select the text channel.")
      .setRequired(true)
  )
  .addIntegerOption((option) =>
    option
      .setName("amount")
      .setDescription("Number of messages to clean")
      .setRequired(true)
      .addChoices(
        { name: "All", value: 0 },
        { name: "1", value: 1 },
        { name: "10", value: 10 },
        { name: "25", value: 25 },
        { name: "50", value: 50 },
        { name: "100", value: 100 }
      )
  );

async function execute(interaction: CommandInteraction) {
  try {
    if (interaction.isCommand() && interaction.commandName === "nuke") {
      const channel = interaction.options.get("channel")!
        .channel as TextChannel;

      if (!channel || channel.type !== ChannelType.GuildText) {
        await interaction.reply("Please provide a valid text channel.");
        return;
      }

      const amount = interaction.options.get("amount")!.value as number;

      if (amount && (amount < 0 || amount > 100)) {
        await interaction.reply(
          "Please provide a valid amount between 0 and 100."
        );
        return;
      }

      let messages;
      if (amount === 0) {
        messages = await channel.messages.fetch();
      } else {
        messages = await channel.messages.fetch({ limit: amount });
      }

      const filteredMessages = messages.filter((msg) => !msg.pinned);

      await channel.bulkDelete(filteredMessages);
      await interaction.reply({
        content: `Successfully deleted ${filteredMessages.size} messages.`,
        ephemeral: true,
      });
    }
  } catch (error) {
    console.error("Error executing 'nuke' command:", error);
    await interaction.reply("An error occurred while executing the command.");
  }
}

export { data, execute };
