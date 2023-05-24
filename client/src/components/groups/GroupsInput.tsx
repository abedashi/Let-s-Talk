// @ts-nocheck
import { FormEvent } from 'react'
import { Socket } from 'socket.io-client'
import { useDispatch } from 'react-redux'
import { addMessage } from '../../features/groups/groupsSlice'
import { BiSend } from 'react-icons/bi'
import { BsFillEmojiSmileFill } from 'react-icons/bs'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'

type Props = {
  userId: string
  name: string
  roomId: string
  socket: Socket
  message: string
  isTyping: boolean
  userWhoTyping: string
  showPicker: boolean
  setShowPicker: () => void
  setMessage: () => void
  onChangeHandler: () => void
}

const ChatsInput: React.FC<Props> = ({
  userId,
  name,
  roomId,
  socket,
  message,
  isTyping,
  showPicker,
  userWhoTyping,
  setShowPicker,
  setMessage,
  onChangeHandler,
}) => {
  const dispatch = useDispatch()
  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    socket.emit('message-group', roomId, message.trim(), name)
    dispatch(addMessage({ name, message, createdAt: new Date().toISOString() }))
    console.log(message)
    setMessage('')
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex items-center p-5'>
      <div className='flex items-center px-3 py-2 rounded-lg w-full'>
        <button
          type='button'
          onClick={() => setShowPicker(!showPicker)}
          className='p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
        >
          <BsFillEmojiSmileFill className='w-6 h-6' />
        </button>
        <div className='w-full relative'>
          <input
            type='text'
            className='bg-background border border-background text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5'
            placeholder='Type message...'
            value={message}
            onChange={onChangeHandler}
            required
          />
          <span className='absolute'>
            {isTyping && userWhoTyping && userWhoTyping !== name && (
              <p>{userWhoTyping.toLowerCase()} is typing...</p>
            )}
          </span>
        </div>
        <button
          type='submit'
          className='inline-flex justify-center p-2 rounded-full cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-600'
        >
          <BiSend className='w-6 h-6 text-primary' />
        </button>
      </div>
      {showPicker && (
        <>
          <div className='backdrop' onClick={() => setShowPicker(false)} />
          <div className='picker-container'>
            <Picker
              data={data}
              previewPosition='none'
              onEmojiSelect={(event) => {
                setShowPicker(false)
                const newMessage = message + event.native
                setMessage(newMessage)
              }}
            />
          </div>
        </>
      )}
    </form>
  )
}

export default ChatsInput
