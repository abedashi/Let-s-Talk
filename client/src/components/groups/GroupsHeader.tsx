// @ts-nocheck
import { Group } from '../../types/types'
import { useSocketContext } from '../../pages/Dashboard'
import { IoPeopleSharp } from 'react-icons/io5'
import { MdGroups } from 'react-icons/md'
import { FaUserAlt } from 'react-icons/fa'
import OnlineGroupMembers from './OnlineGroupMembers'
import 'animate.css'

type Props = {
  group: Group
  isDropdownOpen: boolean
  toggleDropdown: () => void
}

const GroupsHeader: React.FC<Props> = ({
  group,
  isDropdownOpen,
  toggleDropdown,
}) => {
  const { onlineUsers } = useSocketContext()

  // Assuming group?.group_members is an array of member objects with a contactID property
  const groupMembers = group?.group_members || []

  // Filter online members from group members
  const onlineGroupMembers = groupMembers.filter((member) => {
    // Check if the member's contactID exists in the onlineUsers array
    return onlineUsers.some((user) => user.userId === member.member.id)
  })

  return (
    <div className='flex items-center p-5 gap-5'>
      <img
        src={group?.image}
        className='w-10 h-10 rounded-full'
        alt='Rounded avatar'
      />
      <div className='flex items-center flex-1'>
        <div className='flex items-center justify-between w-full'>
          <div className='text-lg capitalize'>{group?.group_name}</div>
          <div className='text-xs text-gray-500'>
            <button
              className='flex items-center gap-2'
              type='button'
              onClick={toggleDropdown}
            >
              <OnlineGroupMembers
                isDropdownOpen={isDropdownOpen}
                groupMembers={groupMembers}
                onlineUsers={onlineUsers}
              />
              <span className='indicator-item indicator-bottom flex w-2 h-2 bg-green-500 rounded-full'></span>
              <span>{onlineGroupMembers.length}</span>
              {onlineGroupMembers.length === 1 && <FaUserAlt />}
              {onlineGroupMembers.length === 2 && <IoPeopleSharp />}
              {onlineGroupMembers.length > 2 && <MdGroups />}
              <svg
                className={`w-4 h-4 ${
                  isDropdownOpen ? 'transform rotate-180' : ''
                }`}
                aria-hidden='true'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M19 9l-7 7-7-7'
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupsHeader
