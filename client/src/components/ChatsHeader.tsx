// @ts-nocheck
type Props = {
  firstName: string;
  lastName: string;
  displayPhoto: string;
  otherUser: string;
  onlineUsers: [];
  openProfile: () => void;
};

const ChatHeader: React.FC<Props> = ({
  firstName,
  lastName,
  displayPhoto,
  otherUser,
  onlineUsers,
  openProfile,
}) => {
  const isUserOnline = onlineUsers.find((user) => user.userId === otherUser);
  return (
    <div className='flex items-center p-5 gap-5'>
      <img
        className='w-10 h-10 rounded-full'
        src={displayPhoto}
        alt='Rounded avatar'
      />
      <div className='flex items-center justify-between flex-1'>
        <div>
          <div className='text-lg capitalize'>{firstName + ' ' + lastName}</div>
          <div className='text-xs text-gray-500'>
            <p>{isUserOnline ? 'Online' : 'Offline'}</p>
          </div>
        </div>
        <div className='cursor-pointer' onClick={openProfile}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5'
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
