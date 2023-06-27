import { Client, GatewayIntentBits } from "discord.js";
import config from "./config";
import * as commandModules from "./commands";

const commands = Object(commandModules);

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
  ],
});

client.once("ready", () => {
  console.log("[ekilox-cmd] Ekilox bot running! ⚡");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  commands[commandName].execute(interaction, client);
});

client.login(config.discord.DISCORD_TOKEN);
