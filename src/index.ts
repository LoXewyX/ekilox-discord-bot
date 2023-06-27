import { createApiRest } from "./api-rest";
import { client } from "./bot";

const api = createApiRest(client);
const port = process.env.PORT || 3000;

api.listen(port, () => {
  console.log(`[ekilox-api]\tServer is running on port ${port} ⚡`);
});