type Props = {
  openProfile: () => void;
};

const ChatHeader: React.FC<Props> = ({ openProfile }) => {
  return (
    <div className='flex p-5 gap-5 h-[10vh]'>
      <img
        className='w-10 h-10 rounded-full'
        src='https://preview.redd.it/dh5otp8kcf741.png?width=640&crop=smart&auto=webp&s=d795f12b5e3eea1ef4d7ceb8244fca98e2384dbf'
        alt='Rounded avatar'
      />
      <div className='flex items-center justify-between flex-1'>
        <div>
          <div className='text-lg'>ashie</div>
          <div className='text-xs text-gray-500'>offline</div>
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
