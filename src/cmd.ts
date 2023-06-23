import { REST, Routes } from "discord.js";
import config from "./config";
import * as commands from "./commands";

const rest = new REST({ version: "10" }).setToken(config.DISCORD_TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(
      Routes.applicationGuildCommands(config.CLIENT_ID, config.GUILD_ID),
      { body: Object.values(commands).map((command) => command.data.toJSON()) }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error("Error refreshing application (/) commands:", error);
  }
})();
