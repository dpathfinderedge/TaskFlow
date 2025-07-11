// let io;

// module.exports = {
//   init: (server) => {
//     io = require('socket.io')(server, {
//       cors: {
//         origin: 'http://localhost:5173',
//         credentials: true
//       }
//     });

//     io.on('connection', (socket) => {
//       console.log('Client connected:', socket.id);

//       // join a room for project list updates
//       socket.on('joinProjects', () => {
//         socket.join('projectsRoom');
//       });

//       socket.on('disconnect', () => {
//         console.log('Client disconnected:', socket.id);
//       });
//     });

//     return io;
//   },
//   getIO: () => {
//     if (!io) throw new Error('Socket.io not initialized!');
//     return io;
//   }
// };


module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('join-project', (projectId) => {
      socket.join(`project_${projectId}`);
      console.log(`Socket ${socket.id} joined project_${projectId}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};
