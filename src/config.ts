import dotenv from "dotenv";

dotenv.config();

const { CLIENT_ID, GUILD_ID, DISCORD_TOKEN } = process.env;

if (!CLIENT_ID || !GUILD_ID || !DISCORD_TOKEN)
  throw new Error("Environment variables are missing.");

const config: Record<string, string> = {
  CLIENT_ID: CLIENT_ID!,
  GUILD_ID: GUILD_ID!,
  DISCORD_TOKEN: DISCORD_TOKEN!,
};

export default config;
