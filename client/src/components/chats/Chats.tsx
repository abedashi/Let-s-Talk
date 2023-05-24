// @ts-nocheck
import { useEffect, useState } from 'react'
import SlideOver from '../ui/SlideOver'
import ChatHeader from './ChatsHeader'
import ChatsContent from './ChatsContent'
import ChatsInput from './ChatsInput'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getChat, reset } from '../../features/chats/chatsSlice'
import { io } from 'socket.io-client'
import { addMessage } from '../../features/chats/chatsSlice'
import Skeleton from '../ui/Skeleton'

const socket = io('http://localhost:3001')

const Chats = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { room, isLoading } = useSelector((store) => store.chats)
  const { user } = useSelector((store) => store.auth)
  const [showPicker, setShowPicker] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [userWhoTyping, setUserWhoTyping] = useState('')
  // const [onlineUsers, setOnlineUsers] = useState<User[]>([]);

  useEffect(() => {
    dispatch(reset())
    dispatch(getChat(id))
  }, [dispatch, id])

  useEffect(() => {
    if (socket) {
      socket.on('typing', (data) => {
        console.log(
          `Received typing event from user ${data.user}: ${data.content}`
        )
        setUserWhoTyping(data.user)
        setIsTyping(true)
      })
      socket.on('stopTyping', () => {
        setUserWhoTyping('')
        setIsTyping(false)
      })
    }
  }, [])

  useEffect(() => {
    let timeout

    const handleStopTyping = () => {
      socket.emit('stopTyping', id)
      setUserWhoTyping('')
      setIsTyping(false)
    }

    if (isTyping) {
      clearTimeout(timeout)
      timeout = setTimeout(handleStopTyping, 1000)
    }

    return () => clearTimeout(timeout)
  }, [isTyping, socket])

  const [message, setMessage] = useState<string>('')

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setMessage(value)
    setIsTyping(true)
    const data: { room: string; content: string; user: string } = {
      room: id,
      content: value,
      user: user?.id || '',
    }
    socket.emit('typing', data)
  }

  const [open, setOpen] = useState(false)
  const openProfile = () => setOpen(true)
  const closeProfile = (payload: boolean) => setOpen(payload)

  const otherUser =
    room.user1 && room.user1.id === (user && user.id)
      ? room.user2
      : room.user2 && room.user2.id === (user && user.id)
      ? room.user1
      : null

  useEffect(() => {
    socket.emit('join', id, user?.id || '')
  }, [id, user])

  // console.log(onlineUsers);

  useEffect(() => {
    socket.on('message', (message) => {
      dispatch(addMessage(message))
      console.log(message)
    })

    return () => {
      socket.off('message')
    }
  }, [id, user])

  if (isLoading) return <Skeleton />

  return (
    <div className='h-screen flex-1 flex flex-col justify-between border-l border-l-sec'>
      <ChatHeader
        otherUser={otherUser?.id}
        firstName={otherUser?.first_name}
        lastName={otherUser?.last_name}
        displayPhoto={otherUser?.display_photo}
        // onlineUsers={onlineUsers}
        openProfile={openProfile}
      />
      <ChatsContent
        messages={room?.chat_messages}
        first_name={user?.first_name}
        last_name={user?.last_name}
      />
      <ChatsInput
        userId={user?.id || ''}
        name={user?.first_name + ' ' + user?.last_name}
        roomId={id}
        socket={socket}
        message={message}
        isTyping={isTyping}
        userWhoTyping={userWhoTyping}
        showPicker={showPicker}
        setMessage={setMessage}
        setShowPicker={setShowPicker}
        onChangeHandler={onChangeHandler}
      />
      <SlideOver
        profile={otherUser}
        isOpen={open}
        closeProfile={closeProfile}
      />
    </div>
  )
}

export default Chats
