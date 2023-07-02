import {
  CommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} from "discord.js";

const data = new SlashCommandBuilder()
  .setName("id")
  .setDescription("Shows the profile data from a specific user.")
  .addUserOption((option) =>
    option.setName("user").setDescription("Select the user.").setRequired(true)
  );

async function execute(interaction: CommandInteraction) {
  try {
    const user = interaction.options.getUser("user")!;
    const member = interaction.guild?.members.cache.get(user.id);

    const id = user.id;
    const name = user.username;
    const roles = member
      ? "- " + member.roles.cache.map((role) => role.name).join("\n- ")
      : "N/A";

    const memberSince = member ? member.joinedAt?.toLocaleDateString()! : "N/A";

    const embed = new EmbedBuilder()
      .setTitle(name)
      .setDescription("User description")
      .setColor("#018574")
      .setThumbnail(user.displayAvatarURL())
      .addFields([
        { name: "ID", value: id, inline: true },
        { name: "Member Since", value: memberSince, inline: true },
        { name: "Roles", value: roles, inline: false },
      ]);

    await interaction.reply({ embeds: [embed] });
  } catch (error) {
    console.error("Error executing 'id' command:", error);
    await interaction.reply("An error occurred while executing the command.");
  }
}

export { data, execute };
