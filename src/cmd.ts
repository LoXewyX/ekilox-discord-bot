import { REST, Routes } from "discord.js";
import config from "./config";
import * as commands from "./commands";

const rest = new REST({ version: "10" }).setToken(config.discord.DISCORD_TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(config.discord.CLIENT_ID, config.discord.GUILD_ID),
      { body: Object.values(commands).map((command) => command.data.toJSON()) }
    );
  } catch (error) {
    console.error(error);
  }
})();
