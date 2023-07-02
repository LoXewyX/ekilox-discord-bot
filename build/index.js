"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ticketRoutes_1 = __importDefault(require("./routes/ticketRoutes"));
const aiRoutes_1 = __importDefault(require("./routes/aiRoutes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Public directory
app.use(express_1.default.static("public"));
app.use("/public", express_1.default.static(__dirname + "/public"));
// Body parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Routes
app.use('/ticket', ticketRoutes_1.default);
app.use('/ai', aiRoutes_1.default);
app.listen(port, () => {
    console.log(`[ekilox-api]\tServer is running on port ${port} ⚡`);
});
