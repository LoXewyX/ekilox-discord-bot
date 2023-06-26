import { Client, ThreadChannel } from "discord.js";
import express, { Request, Response } from "express";

export function createApiRest(client: Client) {
  const app = express();
  app.use(express.json());

  // GET on endpoint - /message
  app.get("/message", async (req: Request, res: Response) => {
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

  // POST on endpoint - /message
  app.post("/message", async (req: Request, res: Response) => {
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
      return res
        .status(500)
        .send("An error occurred while sending the message");
    }
  });
  // DELETE on endpoint - /message/:messageId
  app.delete("/message/:messageId", async (req: Request, res: Response) => {
    const { threadId } = req.query;
    const messageId = req.params.messageId;

    if (!threadId) {
      return res.status(400).send("Missing threadId");
    }

    try {
      const thread = await client.channels.fetch(threadId as string);
      if (!thread || !(thread instanceof ThreadChannel)) {
        return res.status(404).send("Thread was not found");
      }

      const message = await thread.messages.fetch(messageId);
      if (!message) {
        return res.status(404).send("Message was not found");
      }

      await message.delete();
      return res.status(200).send("Message was deleted");
    } catch (error) {
      console.error("Error deleting message:", error);
      return res
        .status(500)
        .send("An error occurred while deleting the message");
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

      await thread.send(
        "This conversation is marked as resolved and will be archived"
      );
      await thread.setArchived(true);
      return res.status(200).send("Thread was resolved");
    } catch (error) {
      console.error("Error resolving thread:", error);
      return res
        .status(500)
        .send("An error occurred while resolving the thread");
    }
  });

  return app;
}
