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
