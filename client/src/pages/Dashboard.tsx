// @ts-nocheck
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import SideBar from '../components/ui/SideBar'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3001')

interface User {
  id: string
}

interface SocketContextProps {
  onlineUsers: User[]
  setOnlineUsers: React.Dispatch<React.SetStateAction<User[]>>
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined)

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state: any) => state.auth)

  const onLogouthandler = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const [onlineUsers, setOnlineUsers] = useState<User[]>([])

  useEffect(() => {
    const handleOnlineUsers = (users: User[]) => {
      setOnlineUsers(users)
    }

    if (socket) {
      socket.emit('join', 'app', user?.id || '')
      socket.on('onlineUsers', handleOnlineUsers)
    }

    return () => {
      if (socket) {
        socket.off('onlineUsers', handleOnlineUsers)
      }
      if (user) {
        socket.emit('leave', 'app', user?.id || '')
      }
    }
  }, [user])

  console.log(onlineUsers)

  return (
    <SocketContext.Provider value={{ onlineUsers, setOnlineUsers }}>
      <div className='flex bg-sec'>
        <SideBar onLogouthandler={onLogouthandler} />
        <Outlet />
      </div>
    </SocketContext.Provider>
  )
}

export default Dashboard

// Custom hook to access SocketContext
const useSocketContext = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error(
      'useSocketContext must be used within a SocketContextProvider'
    )
  }
  return context
}

export { useSocketContext }
