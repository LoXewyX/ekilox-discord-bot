import express from "express";
import serverless from "serverless-http";
import { createApiRest } from "./api-rest";
import { client } from "./bot";

const app = express();

// Create the API routes
const api = createApiRest(client);
app.use("/api", api);

// Define additional routes or middleware as needed

// Create the serverless handler
const handler = serverless(app);

// Export the handler for serverless deployment
export { handler };
