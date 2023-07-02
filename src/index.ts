import express from "express";
import ticketRouter from './routes/ticketRoutes';
import aiRouter from './routes/aiRoutes';

const app = express();
const port = process.env.PORT || 3000;

// Public directory
app.use(express.static("public"));
app.use("/public", express.static(__dirname + "/public"));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/ticket', ticketRouter);
app.use('/ai', aiRouter);

app.listen(port, () => {
  console.log(`[ekilox-api]\tServer is running on port ${port} ⚡`);
});