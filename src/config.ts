import dotenv from "dotenv";

dotenv.config();

const { CLIENT_ID, GUILD_ID, DISCORD_TOKEN, MONGO_URI, OPENAI_API_KEY } =
  process.env;

if (!CLIENT_ID || !GUILD_ID || !DISCORD_TOKEN || !MONGO_URI || !OPENAI_API_KEY)
  throw new Error("Environment variables are missing.");

const discord: Record<string, string> = {
  CLIENT_ID: CLIENT_ID!,
  GUILD_ID: GUILD_ID!,
  DISCORD_TOKEN: DISCORD_TOKEN!,
  OPENAI_API_KEY: OPENAI_API_KEY!,
};

const mongodb: Record<string, string> = {
  MONGO_URI: MONGO_URI!,
};

const openai: Record<string, string> = {
  OPENAI_API_KEY: OPENAI_API_KEY!,
};

export default { discord, mongodb, openai };
