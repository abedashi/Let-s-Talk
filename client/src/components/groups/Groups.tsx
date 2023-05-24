import { useState, useEffect } from 'react'
import GroupsHeader from './GroupsHeader'
import GroupsContent from './GroupsContent'
import GroupsInput from './GroupsInput'
import { addMessage } from '../../features/groups/groupsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getGroup, reset } from '../../features/groups/groupsSlice'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import Skeleton from '../ui/Skeleton'

const socket = io('http://localhost:3001')

const Groups = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { group, isLoading } = useSelector((store: any) => store.groups)
  const { user } = useSelector((store: any) => store.auth)
  const [showPicker, setShowPicker] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [userWhoTyping, setUserWhoTyping] = useState('')

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const [message, setMessage] = useState<string>('')

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setMessage(value)
    setIsTyping(true)
    const data: {
      room: string | undefined
      content: string
      user: string
      name: string
    } = {
      room: id,
      content: value,
      user: user?.id || '',
      name: user?.first_name + ' ' + user?.last_name,
    }
    socket.emit('typing', data)
  }

  useEffect(() => {
    dispatch(reset())
    dispatch(getGroup(id))
  }, [id])

  useEffect(() => {
    socket.emit('join', id, user?.id || '')
  }, [id, user])

  useEffect(() => {
    socket.on('message-group', (message) => {
      dispatch(addMessage(message))
      console.log(message)
    })

    return () => {
      socket.off('message-group')
    }
  }, [id, user])

  useEffect(() => {
    let timeout: any

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

  useEffect(() => {
    if (socket) {
      socket.on('typing', (data) => {
        console.log(
          `Received typing event from user ${data.name}: ${data.content}`
        )
        setUserWhoTyping(data.name)
        setIsTyping(true)
      })
      socket.on('stopTyping', () => {
        setUserWhoTyping('')
        setIsTyping(false)
      })
    }
  }, [])

  if (isLoading) return <Skeleton />

  return (
    <div className='h-screen flex-1 flex flex-col justify-between border-l border-l-sec'>
      <GroupsHeader
        group={group}
        isDropdownOpen={isDropdownOpen}
        toggleDropdown={toggleDropdown}
      />
      <GroupsContent
        messages={group?.group_messages}
        first_name={user?.first_name}
        last_name={user?.last_name}
      />
      <GroupsInput
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
    </div>
  )
}

export default Groups
