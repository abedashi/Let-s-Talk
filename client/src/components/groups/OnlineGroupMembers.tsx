import { Member } from '../../types/types'

type Props = {
  isDropdownOpen: boolean
  groupMembers: Array<{ member: Member }>
  onlineUsers: Array<{ userId: string }>
}

const OnlineGroupMembers: React.FC<Props> = ({
  isDropdownOpen,
  groupMembers,
  onlineUsers,
}) => {
  return (
    <div className='relative inline-block'>
      {isDropdownOpen && (
        <div className='z-10 bg-white rounded-lg shadow w-60 absolute right-0'>
          <ul>
            {groupMembers.map((groupMember) => {
              const isOnline = onlineUsers.some(
                (user) => user.userId === groupMember.member.id
              )

              return (
                <li
                  key={groupMember.member.id}
                  className={`flex items-center px-4 py-2 hover:bg-gray-100 ${
                    isOnline ? 'text-green-500' : ''
                  }`}
                >
                  <img
                    className='w-6 h-6 mr-2 rounded-full'
                    src={groupMember.member.display_photo}
                    alt={
                      groupMember.member.first_name +
                      ' ' +
                      groupMember.member.last_name
                    }
                  />
                  {groupMember.member.first_name +
                    ' ' +
                    groupMember.member.last_name}
                  {isOnline && <span className='ml-2'>(Online)</span>}
                </li>
              )
            })}
          </ul>
          <a
            href='#'
            className='flex items-center p-3 text-sm font-medium text-primary border-t border-gray-200 rounded-b-lg bg-gray-50 hover:underline'
          >
            <svg
              className='w-5 h-5 mr-1'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z'></path>
            </svg>
            Add new member
          </a>
        </div>
      )}
    </div>
  )
}

export default OnlineGroupMembers
