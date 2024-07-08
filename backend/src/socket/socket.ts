// import { Server } from 'socket.io';

// const socket = (app: any) => {
//   const io = new Server(app, {
//     cors: {
//       origin: "http://localhost:3000", // Ensure this is the same origin as your frontend
//       methods: ["GET", "POST"]
//     }
//   });

//   io.on('connection', (socket) => {
//     console.log('A user connected');
    
//     // Add your socket event listeners here
    
//     socket.on('disconnect', () => {
//       console.log('User disconnected');
//     });
//   });
// };

// export default socket;
