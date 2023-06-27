import dotenv from "dotenv";

dotenv.config();

const { CLIENT_ID, GUILD_ID, DISCORD_TOKEN, MONGO_URI } = process.env;

if (!CLIENT_ID || !GUILD_ID || !DISCORD_TOKEN)
  throw new Error("Environment variables are missing.");

const discord: Record<string, string> = {
  CLIENT_ID: CLIENT_ID!,
  GUILD_ID: GUILD_ID!,
  DISCORD_TOKEN: DISCORD_TOKEN!,
};

const mongodb: Record<string, string> = {
  MONGO_URI: MONGO_URI!
};

export default { discord, mongodb };
