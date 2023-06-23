import { client } from "./bot";
import { createApiRest } from "./api-rest";

const HOST = "http://localhost";
const PORT = process.env.port || 8000;

const api = createApiRest(client);
api.listen(PORT, () => {
  console.log(`⚡[rest-api]: Now running on port ${HOST}:${PORT}⚡`);
});
