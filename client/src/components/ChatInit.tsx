// @ts-nocheck
import { useSelector } from 'react-redux';

const ChatInit = () => {
  const { user } = useSelector((store) => store.auth);
  return (
    <div className='hero min-h-screen bg-background flex-1'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <img
            src={user.display_photo}
            className='max-w-sm w-96 h-96 rounded-lg shadow-2xl'
          />
          <h1 className='text-5xl signika_bold mt-4 capitalize'>
            {user.first_name} {user.last_name}
          </h1>
          <p className='py-6'>{user.email}</p>
          <p className='py-6'>{user.about}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatInit;
