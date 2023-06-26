import { REST, Routes } from "discord.js";
import config from "./config";
import * as commands from "./commands";

const rest = new REST({ version: "10" }).setToken(config.DISCORD_TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(config.CLIENT_ID, config.GUILD_ID),
      { body: Object.values(commands).map((command) => command.data.toJSON()) }
    );
  } catch (error) {
    console.error(error);
  }
})();
