const Skeleton = () => {
  return (
    <div className='h-screen flex-1 flex flex-col justify-between border-l border-l-sec'>
      <div className='flex items-center justify-between px-5 py-3'>
        <div className='flex items-center space-x-3'>
          <svg
            className='text-gray-200 w-14 h-14 dark:text-background'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
              clipRule='evenodd'
            ></path>
          </svg>
          <div>
            <div className='w-48 h-2.5 bg-gray-200 rounded-full dark:bg-background mb-2'></div>
            <div className='h-2 bg-gray-200 rounded-full dark:bg-background w-16'></div>
          </div>
        </div>

        <div className='h-6 bg-gray-200 rounded-full dark:bg-background w-10'></div>
      </div>

      <div
        role='status'
        className='flex flex-col flex-1 items-center justify-center bg-background'
      >
        <svg
          aria-hidden='true'
          className='w-12 h-12 text-gray-200 animate-spin dark:text-sec fill-primary'
          viewBox='0 0 100 101'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
            fill='currentColor'
          />
          <path
            d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
            fill='currentFill'
          />
        </svg>
        <span className='sr-only'>Loading...</span>
      </div>

      <div className='p-5 py-8'>
        <div className='flex items-center justify-between gap-10'>
          <div className='flex items-center gap-4 w-full'>
            <div className='h-7 bg-gray-300 rounded-full dark:bg-background w-7'></div>
            <div className='w-full h-7 bg-gray-200 rounded-full dark:bg-background'></div>
          </div>
          <svg
            className='w-8 h-8 text-gray-200 dark:text-background'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 384 512'
          >
            <path d='M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z' />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Skeleton
