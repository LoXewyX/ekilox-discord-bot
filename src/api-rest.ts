import { Client, ThreadChannel } from "discord.js";
import express, { Request, Response } from "express";

export function createApiRest(client: Client) {
  const app = express();
  app.use(express.json());

  // GET on endpoint - /messages
  app.get("/messages", async (req: Request, res: Response) => {
    const { threadId } = req.query;
    if (!threadId) return res.status(400).send("Missing threadId");

    try {
      const thread = await client.channels.fetch(threadId as string);
      if (!thread || !(thread instanceof ThreadChannel)) {
        return res.status(404).send("Thread was not found");
      }

      const messages = await thread.messages.fetch();
      return res.status(200).json(messages || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      return res.status(500).send("An error occurred while fetching messages");
    }
  });

  // POST on endpoint - /messages
  app.post("/messages", async (req: Request, res: Response) => {
    const { threadId, text } = req.body;
    if (!threadId || !text) {
      return res.status(400).send("Missing threadId or text");
    }

    try {
      const thread = await client.channels.fetch(threadId as string);
      if (!thread || !(thread instanceof ThreadChannel)) {
        return res.status(404).send("Thread was not found");
      }

      await thread.send(text);
      return res.status(200).send("Message was sent");
    } catch (error) {
      console.error("Error sending message:", error);
      return res.status(500).send("An error occurred while sending the message");
    }
  });

  // POST on endpoint - /resolve
  app.post("/resolve", async (req: Request, res: Response) => {
    const { threadId } = req.body;
    if (!threadId) return res.status(400).send("Missing threadId");

    try {
      const thread = await client.channels.fetch(threadId as string);
      if (!thread || !(thread instanceof ThreadChannel)) {
        return res.status(404).send("Thread was not found");
      }

      await thread.send("This conversation is marked as resolved and will be archived");
      await thread.setArchived(true);
      return res.status(200).send("Thread was resolved");
    } catch (error) {
      console.error("Error resolving thread:", error);
      return res.status(500).send("An error occurred while resolving the thread");
    }
  });

  return app;
}
