// import express, { Request, Response, NextFunction } from 'express';
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import leagueRoutes from "./routes/leagueRoutes";
import { Server } from "socket.io";
import http from "http";

dotenv.config({ path: __dirname + "/../.env" }); // Adjust path if needed

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Adjust if your frontend runs on a different port
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

  socket.on("startAuction", (data) => {
    console.log("Auction started:", data);
    socket.broadcast.emit("startAuction", data);
  });

  socket.on("placeBid", (data) => {
    console.log("Bid placed:", data);
    socket.broadcast.emit("placeBid", data);
  });

  // Add other WebSocket event handlers as needed

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Server setup
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
