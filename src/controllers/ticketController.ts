import { ThreadChannel } from "discord.js";
import { Request, Response } from "express";
import { deleteTicket } from "../db";
import { client } from "../bot";

const getThreadId = async (req: Request, res: Response) => {
  {
    const { threadId } = req.params;
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
  }
};

const postMessage = async (req: Request, res: Response) => {
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
};

const deleteThreadId = async (req: Request, res: Response) => {
  const { threadId } = req.params;

  if (!threadId) {
    return res.status(400).send("Missing threadId");
  }

  try {
    await deleteTicket(threadId);

    const thread = await client.channels.fetch(threadId);
    if (!thread || !(thread instanceof ThreadChannel)) {
      return res.status(404).send("Thread was not found");
    }
    await thread.delete();
    console.log("Thread deleted successfully!");

    return res.status(200).send("Ticket and thread were deleted");
  } catch (error) {
    console.error("Error deleting ticket and thread:", error);
    return res
      .status(500)
      .send("An error occurred while deleting the ticket and thread");
  }
};

const resolveTicket = async (req: Request, res: Response) => {
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
    return res.status(500).send("An error occurred while resolving the thread");
  }
};

export { getThreadId, postMessage, deleteThreadId, resolveTicket };
