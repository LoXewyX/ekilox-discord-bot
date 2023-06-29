import {
  ActivityType,
  CommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder
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
    const guildStatus = member ? "Member" : "Not a member";
    const roles = member
      ? member.roles.cache.map((role) => role.name).join(", ")
      : "N/A";
    const memberSince = member ? member.joinedAt?.toLocaleDateString()! : "N/A";
    const presence = member?.presence;
    const about =
      presence?.activities?.find(
        (activity) =>
          activity.type === ActivityType.Custom ||
          activity.type === ActivityType.Playing
      )?.name || "N/A";

    const userData = `
    **User Data**
    ID: \`${id}\`
    Name: ${name}
    Guild Status: ${guildStatus}
    About: ${about}
    Roles: ${roles}
    Member Since: ${memberSince}
  `;

    await interaction.reply(userData);
  } catch (error) {
    console.error("Error executing 'id' command:", error);
    await interaction.reply("An error occurred while executing the command.");
  }
}

export { data, execute };
