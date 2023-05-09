import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { errorHandler } from './middlewares/error';
import { userRouter } from './routes/userRoutes';
import { storyRouter } from './routes/storyRoutes';
import { chatRouter } from './routes/chatRoutes';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRouter);
app.use('/api/storys', storyRouter);
app.use('/api/chats', chatRouter);

app.use(errorHandler);

io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on('join', (roomId: string, userId: string) => {
    socket.join(roomId);
    socket.to(roomId).emit('user joined', userId);
    console.log(userId, 'joined room Id', roomId);
  });

  socket.on('message', (roomId: string, message: string) => {
    socket.to(roomId).emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);
  });
});

const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Server running on port ${port}`));
