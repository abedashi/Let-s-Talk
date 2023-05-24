// @ts-nocheck
import { FormEvent } from 'react'
import { Socket } from 'socket.io-client'
import { useDispatch } from 'react-redux'
import { addMessage } from '../../features/chats/chatsSlice'
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

    socket.emit('message', roomId, message.trim(), name)
    dispatch(
      addMessage({
        name,
        message,
        createdAt: new Date().toISOString(),
        chat_id: roomId,
      })
    )
    console.log(message)
    setMessage('')
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex items-center p-5'>
      <label htmlFor='chat' className='sr-only'>
        Your message
      </label>
      <div className='flex items-center px-3 py-2 rounded-lg w-full'>
        <button
          type='button'
          onClick={() => setShowPicker(!showPicker)}
          className='p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
        >
          <svg
            aria-hidden='true'
            className='w-6 h-6'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z'
              clipRule='evenodd'
            ></path>
          </svg>
          <span className='sr-only'>Add emoji</span>
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
            {isTyping && userWhoTyping && userWhoTyping !== userId && (
              <p>typing...</p>
            )}
          </span>
        </div>
        <button
          type='submit'
          className='inline-flex justify-center p-2 rounded-full cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-600'
        >
          <svg
            aria-hidden='true'
            className='w-6 h-6 rotate-90 text-primary'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z'></path>
          </svg>
          <span className='sr-only'>Send message</span>
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
