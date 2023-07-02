import axios from "axios";
import querystring from 'querystring'
import { CommandInteraction, SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
  .setName("img")
  .setDescription("Generates AI images.")
  .addStringOption((option) =>
    option
      .setName("prompt")
      .setDescription("Enter your text prompt.")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("size")
      .setDescription("Enter your image size.")
      .setRequired(true)
      .addChoices(
        { name: "Small", value: "small" },
        { name: "Medium", value: "medium" },
        { name: "Large", value: "large" }
      )
  );

async function execute(interaction: CommandInteraction) {
  try {
    if (interaction.isCommand() && interaction.commandName === "img") {
      const prompt = interaction.options.get("prompt")!.value as string;
      const size = interaction.options.get("size")!.value as string;

      try {
        const params = querystring.stringify({ prompt, size });

        const response = await axios.post("https://ekilox-api.onrender.com/ai/generate/image", params, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        if (response.status !== 200) {
          throw new Error("Failed to create post");
        }

        interface IResponse {
          success: boolean;
          data: string;
        }

        const responseData: IResponse = response.data;
        await interaction.reply({ files: [responseData.data] });
      } catch (error) {
        console.error(error);
      }
    }
  } catch (error) {
    console.error("Error executing 'img' command:", error);
    await interaction.reply("An error occurred while executing the command.");
  }
}

export { data, execute };
