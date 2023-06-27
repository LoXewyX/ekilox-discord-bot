"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_rest_1 = require("./api-rest");
const bot_1 = require("./bot");
const api = (0, api_rest_1.createApiRest)(bot_1.client);
const port = process.env.PORT || 3000;
api.listen(port, () => {
    console.log(`[ekilox-api]\tServer is running on port ${port} ⚡`);
});
