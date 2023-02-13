import { useState } from 'react';
import SlideOver from './ui/SlideOver';
import ChatHeader from './ChatsHeader';
import ChatsContent from './ChatsContent';
import ChatsInput from './ChatsInput';

const Chats = () => {
  const [open, setOpen] = useState(false);
  const openProfile = () => setOpen(true);
  const closeProfile = (payload: boolean) => setOpen(payload);

  return (
    <div className='flex-1 flex flex-col justify-between border-l border-l-[#1B1B1B]'>
      <ChatHeader openProfile={openProfile} />
      <ChatsContent />
      <ChatsInput />
      <SlideOver isOpen={open} closeProfile={closeProfile} />
    </div>
  );
};

export default Chats;
