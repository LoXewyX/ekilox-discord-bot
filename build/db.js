"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicket = exports.createTicket = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
/* START Pool connection */
mongoose_1.default
    .connect(config_1.default.mongodb.MONGO_URI, {
    dbName: 'ekilox-discord'
})
    .then(() => {
    console.log("[ekilox-db]\t\tConnected to MongoDB Atlas ⚡");
})
    .catch((error) => {
    console.error("[ekilox-db]\t\tMongoDB Atlas connection error ❌:", error);
});
// Define a Mongoose schema for the ticket
const ticketSchema = new mongoose_1.default.Schema({
    threadId: String,
    text: String,
    openedAt: Date,
});
/* END Pool connection */
/* START Tickets */
// Create a Mongoose model for the ticket
const Ticket = mongoose_1.default.model("Ticket", ticketSchema);
// Create a ticket
function createTicket(threadId, text) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ticket = new Ticket({
                threadId,
                text,
                openedAt: new Date(),
            });
            yield ticket.save();
            console.log("Ticket created successfully!");
        }
        catch (error) {
            console.error("Error creating ticket:", error);
        }
    });
}
exports.createTicket = createTicket;
// Delete a ticket
function deleteTicket(threadId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield Ticket.deleteOne({ threadId });
            if (result.deletedCount === 1) {
                console.log("Ticket deleted successfully!");
            }
            else {
                console.log("Ticket not found");
            }
        }
        catch (error) {
            console.error("Error deleting ticket:", error);
        }
    });
}
exports.deleteTicket = deleteTicket;
/* END Tickets */ 
