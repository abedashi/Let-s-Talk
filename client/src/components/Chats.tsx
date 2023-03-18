import { useState } from 'react';
import SlideOver from './ui/SlideOver';
import ChatHeader from './ChatsHeader';
import ChatsContent from './ChatsContent';
import ChatsInput from './ChatsInput';
import { useParams } from 'react-router-dom';

const Chats = () => {
  const [open, setOpen] = useState(false);
  const openProfile = () => setOpen(true);
  const closeProfile = (payload: boolean) => setOpen(payload);

  const { id } = useParams();

  return (
    <div className='h-screen flex-1 flex flex-col justify-between border-l border-l-sec'>
      <ChatHeader openProfile={openProfile} />
      <ChatsContent />
      <ChatsInput />
      <SlideOver isOpen={open} closeProfile={closeProfile} />
    </div>
  );
};

export default Chats;
