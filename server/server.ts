import express from 'express'
import http from 'http'
import { PrismaClient } from '@prisma/client'
import { Server, Socket } from 'socket.io'
import { errorHandler } from './middlewares/error'
import { userRouter } from './routes/userRoutes'
import { storyRouter } from './routes/storyRoutes'
import { chatRouter } from './routes/chatRoutes'
import { groupRouter } from './routes/groupRoutes'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
})

const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', userRouter)
app.use('/api/storys', storyRouter)
app.use('/api/chats', chatRouter)
app.use('/api/groups', groupRouter)

app.use(errorHandler)

// interface OnlineUsers {
//   [socketId: string]: string;
// }

// const onlineUsers: OnlineUsers = {}; // Store online users in a dictionary

interface User {
  roomId: string
  userId: string
}

function isUserIdAlreadyAdded(userId: string) {
  const users = Object.values(onlineUsers)
  for (const user of users) {
    if (user.userId === userId) {
      return true // userId already exists in the onlineUsers array
    }
  }
  return false // userId does not exist in the onlineUsers array
}

const onlineUsers: Record<string, User> = {} // Store online users in a dictionary

io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`)

  socket.on('join', (roomId: string, userId: string) => {
    socket.join(roomId)
    if (roomId === 'app' && userId && !isUserIdAlreadyAdded(userId)) {
      onlineUsers[socket.id] = { roomId, userId }
      io.emit('onlineUsers', Object.values(onlineUsers))
    }
    console.log(userId, 'joined room Id', roomId)
  })

  socket.on('leave', async (roomId, userId) => {
    socket.leave(roomId)
    delete onlineUsers[socket.id]
    io.emit('onlineUsers', Object.values(onlineUsers))
    // delete onlineUsers[socket.id];
    // io.to(roomId).emit('onlineUsers', Object.values(onlineUsers));
    console.log(`User ${userId} left room ${roomId}.`)
  })

  socket.on('message', async (roomId, message, name) => {
    try {
      // const userId = getUserIdFromSocket(socket);

      const newMessage = await prisma.chat_Message.create({
        data: {
          chat: { connect: { id: roomId } },
          name,
          message: message,
          chat_id: roomId,
        },
      })

      socket.to(roomId).emit('message', newMessage)
    } catch (error) {
      console.error(error)
    }
  })

  socket.on('message-group', async (roomId, message, name) => {
    try {
      const newMessage = await prisma.group_messages.create({
        data: {
          group: { connect: { id: roomId } },
          name,
          message: message,
        },
      })

      socket.to(roomId).emit('message-group', newMessage)
    } catch (error) {
      console.error(error)
    }
  })

  socket.on(
    'typing',
    (data: { room: string; content: string; user: string }) => {
      console.log(
        `Received typing event in room ${data.room}: ${data.content} - ${data.user}`
      )
      io.to(data.room).emit('typing', data)
    }
  )

  socket.on('stopTyping', (room: string) => {
    console.log(`Received stopTyping event in room ${room}`)
    socket.to(room).emit('stopTyping')
  })

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`)
    delete onlineUsers[socket.id]
    io.emit('onlineUsers', Object.values(onlineUsers))
  })
})

const port = process.env.PORT || 3001
server.listen(port, () => console.log(`Server running on port ${port}`))
