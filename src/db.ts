import mongoose from "mongoose";
import config from "./config";

console.log(config.mongodb.MONGO_URI);

mongoose
  .connect(config.mongodb.MONGO_URI, {
    dbName: 'ekilox-discord'
  })
  .then(() => {
    console.log("[ekilox-db] Connected to MongoDB Atlas ⚡");
  })
  .catch((error) => {
    console.error("[ekilox-db] MongoDB Atlas connection error 🚫:", error);
  });

// Define a Mongoose schema for the ticket
const ticketSchema = new mongoose.Schema({
  threadId: String,
  text: String,
  openedAt: Date,
});

// Create a Mongoose model for the ticket
const Ticket = mongoose.model("Ticket", ticketSchema);

// Create a ticket
export async function createTicket(threadId: string, text: string) {
  try {
    const ticket = new Ticket({
      threadId,
      text,
      openedAt: new Date(),
    });

    await ticket.save();

    console.log("Ticket created successfully!");
  } catch (error) {
    console.error("Error creating ticket:", error);
  }
}

// Delete a ticket
export async function deleteTicket(threadId: string) {
  try {
    const result = await Ticket.deleteOne({ threadId });

    if (result.deletedCount === 1) {
      console.log("Ticket deleted successfully!");
    } else {
      console.log("Ticket not found");
    }
  } catch (error) {
    console.error("Error deleting ticket:", error);
  }
}
