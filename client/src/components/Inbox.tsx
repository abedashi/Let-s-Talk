// @ts-nocheck
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { getChats } from '../features/chats/chatsSlice'
import { getGroups } from '../features/groups/groupsSlice'
import { HiOutlineUserAdd } from 'react-icons/hi'
import { MdOutlineGroupAdd } from 'react-icons/md'
import { Groups, Chats } from '../types/types'
import Modal4 from './ui/Modal4'

function formatDate(dateString) {
  const date = new Date(dateString)
  const options = {
    day: '2-digit',
    month: 'short',
    year: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }
  return date.toLocaleString('en-US', options)
}

const Inbox = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((store) => store.auth)
  const { chats } = useSelector((store) => store.chats)
  const { groups } = useSelector((store) => store.groups)

  const sortedChats = chats
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  useEffect(() => {
    dispatch(getChats())
    dispatch(getGroups())
  }, [dispatch])

  const [isChat, setIsChat] = useState(true)

  useEffect(() => {
    console.log(isChat)
  }, [isChat])

  const onChatHandler = () => {
    setIsChat(true)
    navigate('/chat/profile')
  }
  const onGroupHandler = () => {
    setIsChat(false)
    navigate('/chat/profile')
  }

  return (
    <div className='w-96 p-5 border-r border-r-background max-lg:hidden'>
      <div className='flex items-center w-full gap-3 mb-2'>
        {isChat && (
          <>
            <label htmlFor='chat'>
              <HiOutlineUserAdd className='w-6 h-6 cursor-pointer' />
            </label>
            <Modal4 modal='chat' />
          </>
        )}
        <div
          className={`grid h-10 flex-grow card bg-background ${
            isChat && 'bg-primary'
          } rounded-box place-items-center cursor-pointer`}
          onClick={onChatHandler}
        >
          Chats
        </div>

        <div
          className={`grid h-10 flex-grow card bg-background ${
            !isChat && 'bg-primary'
          } rounded-box place-items-center cursor-pointer`}
          onClick={onGroupHandler}
        >
          Groups
        </div>
        {!isChat && (
          <>
            <label htmlFor='group'>
              <MdOutlineGroupAdd className='w-6 h-6 cursor-pointer' />
            </label>
            <Modal4 modal='group' />
          </>
        )}
      </div>

      <div className='h-[95%] overflow-y-scroll'>
        {isChat &&
          sortedChats.map((chat: Chats) => {
            const otherUser =
              chat?.user1?.id === (user && user.id) ? chat.user2 : chat.user1
            if (otherUser.id !== user && user.id) {
              return (
                <div key={chat.id}>
                  <NavLink
                    to={`/chat/${chat.id}`}
                    key={chat.id}
                    style={({ isActive }) => {
                      return {
                        backgroundColor: isActive ? '#242424' : '',
                      }
                    }}
                    className='flex items-center cursor-pointer p-2'
                  >
                    <div className='avatar p-1'>
                      <div className='w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                        <img src={otherUser.display_photo} />
                      </div>
                    </div>
                    <div className='flex-1 px-2'>
                      <div className='flex items-center justify-between'>
                        <div className='font-bold text-lg capitalize'>
                          {otherUser.first_name} {otherUser.last_name}
                        </div>
                        {chat?.chat_messages?.length > 0 && (
                          <div className='text-xs text-gray-500'>
                            {formatDate(
                              chat?.chat_messages?.slice(-1)[0]?.createdAt
                            )}
                          </div>
                        )}
                      </div>
                      <div className='text-gray-500'>
                        <div className='w-64 truncate break-words'>
                          {chat?.chat_messages?.slice(-1)[0]?.message}
                        </div>
                      </div>
                    </div>
                  </NavLink>
                  <hr className='border-background' />
                </div>
              )
            }
            return null
          })}

        {!isChat &&
          groups.map((group: Groups) => {
            return (
              <div key={group.id}>
                <NavLink
                  to={`/chat/group/${group.id}`}
                  key={group.id}
                  style={({ isActive }) => {
                    return {
                      backgroundColor: isActive ? '#242424' : '',
                    }
                  }}
                  className='flex items-center cursor-pointer p-2'
                >
                  <div className='avatar p-1'>
                    <div className='w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                      <img src={group.image} />
                    </div>
                  </div>
                  <div className='flex-1 px-2'>
                    <div className='flex items-center justify-between'>
                      <div className='font-bold text-lg capitalize'>
                        {group.group_name}
                      </div>
                      <div className='text-xs text-gray-500'>
                        {formatDate(group.createdAt)}
                      </div>
                    </div>
                  </div>
                </NavLink>
                <hr className='border-background' />
              </div>
            )
          })}
      </div>

      {/* <div className='h-[95%] overflow-y-scroll'>
        {chats.map((chat: Chats[]) => (
          {chat.user1.id === user && user.id &&
          <div key={chat.user1.id}>
            <NavLink
              to={`/chat/${chat.id}`}
              key={chat.id}
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive ? '#242424' : '',
                };
              }}
              className='flex items-center cursor-pointer p-2'
            >
              <div className='avatar p-1'>
                <div className='w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                  <img src={chat.display_photo} />
                </div>
              </div>
              <div className='flex-1 px-2'>
                <div className='flex items-center justify-between'>
                  <div className='font-bold text-lg capitalize'>
                    {chat.first_name} {chat.last_name}
                  </div>
                  <div className='text-xs text-gray-500'>3:21 pm</div>
                </div>
                <div className='text-gray-500'>message</div>
              </div>
            </NavLink>
            <hr className='border-background' />
          </div>}
        ))}
      </div> */}

      {/* <div className='flex items-center cursor-pointer p-2 rounded border'>
        <div className='avatar p-1'>
          <div className='w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
            <img src='https://preview.redd.it/dh5otp8kcf741.png?width=640&crop=smart&auto=webp&s=d795f12b5e3eea1ef4d7ceb8244fca98e2384dbf' />
          </div>
        </div>
        <div className='flex-1 px-2'>
          <div className='flex items-center justify-between'>
            <div className='font-bold text-lg'>habib</div>
            <div className='text-xs text-gray-500'>3:21 pm</div>
          </div>
          <div className='text-gray-500'>message</div>
        </div>
      </div> */}
      {/* <hr className='border-background' />
      <div className='flex items-center bg-background p-2 cursor-pointer rounded'>
        <div className='avatar p-1'>
          <div className='w-10 h-10 rounded-full'>
            <img src='https://preview.redd.it/dh5otp8kcf741.png?width=640&crop=smart&auto=webp&s=d795f12b5e3eea1ef4d7ceb8244fca98e2384dbf' />
          </div>
        </div>
        <div className='flex-1 px-2'>
          <div className='flex items-center justify-between'>
            <div className='font-bold text-lg'>ashie</div>
            <div className='text-xs text-gray-500'>12:30 pm</div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='text-primary'>message</div>
            <span className='flex w-3 h-3 bg-primary rounded-full'></span>
          </div>
        </div>
      </div>
      <hr className='border-background' /> */}
    </div>
  )
}

export default Inbox
