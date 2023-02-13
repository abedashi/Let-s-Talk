const Inbox = () => {
  return (
    <div className='w-96 p-5 border-r border-r-primary max-lg:hidden'>
      <div className='mb-4'>
        <input
          type='search'
          id='company'
          className='bg-primary border border-primary text-white text-sm rounded-lg focus:ring-purple focus:border-purple block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Search or start new chat'
        />
      </div>
      <div className='flex items-center cursor-pointer p-2 rounded'>
        <img
          className='w-10 h-10 rounded-full'
          src='https://preview.redd.it/dh5otp8kcf741.png?width=640&crop=smart&auto=webp&s=d795f12b5e3eea1ef4d7ceb8244fca98e2384dbf'
          alt='Rounded avatar'
        />
        <div className='flex-1 px-2'>
          <div className='flex items-center justify-between'>
            <div className='font-bold text-lg'>habib</div>
            <div className='text-xs text-gray-500'>3:21 pm</div>
          </div>
          <div className='text-gray-500'>message</div>
        </div>
      </div>
      <hr className='border-primary' />
      <div className='flex items-center bg-primary p-2 cursor-pointer rounded'>
        <img
          className='w-10 h-10 p-1 rounded-full ring-2 ring-purple dark:ring-gray-500'
          src='https://preview.redd.it/dh5otp8kcf741.png?width=640&crop=smart&auto=webp&s=d795f12b5e3eea1ef4d7ceb8244fca98e2384dbf'
          alt='Bordered avatar'
        />
        <div className='flex-1 px-2'>
          <div className='flex items-center justify-between'>
            <div className='font-bold text-lg'>ashie</div>
            <div className='text-xs text-gray-500'>12:30 pm</div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='text-purple'>message</div>
            <span className='flex w-3 h-3 bg-purple rounded-full'></span>
          </div>
        </div>
      </div>
      <hr className='border-primary' />
    </div>
  );
};

export default Inbox;
