import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import leagueRoutes from "./routes/leagueRoutes";
import { Server } from "socket.io";
import http from "http";

dotenv.config({ path: __dirname + "/.env" });

// console.log('Database User:', process.env.DB_USER);
// console.log('Database Host:', process.env.DB_HOST);
// console.log('Database Name:', process.env.DB_NAME);
// console.log('Database Password:', process.env.DB_PASSWORD);
// console.log('Database Port:', process.env.DB_PORT);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Ensure body parser middleware is used
app.use("/api/leagues", leagueRoutes);

// WebSocket setup
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  // Add your socket event listeners here
});

// Server setup
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
