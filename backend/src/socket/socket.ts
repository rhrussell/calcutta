import { Server } from "socket.io";

const io = new Server({
  // Optionally configure CORS or other options
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle events like 'startAuction', 'placeBid', etc.
  socket.on("startAuction", (data) => {
    socket.broadcast.emit("startAuction", data);
  });

  socket.on("timerPaused", (data) => {
    socket.broadcast.emit("timerPaused", data);
  });

  socket.on("timerEnded", (data) => {
    socket.broadcast.emit("timerEnded", data);
  });

  socket.on("timerUpdate", (data) => {
    socket.broadcast.emit("timerUpdate", data);
  });

  socket.on("previousTeamInfoNull", (data) => {
    socket.broadcast.emit("previousTeamInfoNull", data);
  });

  socket.on("updateUpcomingTeams", (data) => {
    socket.broadcast.emit("updateUpcomingTeams", data);
  });

  socket.on("placeBid", (data) => {
    socket.broadcast.emit("placeBid", data);
  });

  // Listen for other necessary events
  // socket.on('someEvent', (data) => {
  //   // Handle event
  // });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

export default io;
