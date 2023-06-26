import { CommandInteraction, SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
  .setName("hi")
  .setDescription("Replies you with your name.");

async function execute(interaction: CommandInteraction) {
  try {
    const user = interaction.user;
    await interaction.reply(`Hi <@${user?.id}>!`);
  } catch (error) {
    console.error("Error executing 'hi' command:", error);
    await interaction.reply("An error occurred while executing the command.");
  }
}

export { data, execute };
