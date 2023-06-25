import { CommandInteraction, SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies to the user.");

async function execute(interaction: CommandInteraction) {
  try {
    const user = interaction.user;
    await interaction.reply(`Hi <@${user?.id}>!`);
  } catch (error) {
    console.error("Error executing 'ping' command:", error);
    await interaction.reply("An error occurred while executing the command.");
  }
}

export { data, execute };
