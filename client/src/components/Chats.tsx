// @ts-nocheck
import { useEffect, useState } from 'react';
import SlideOver from './ui/SlideOver';
import ChatHeader from './ChatsHeader';
import ChatsContent from './ChatsContent';
import ChatsInput from './ChatsInput';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getChat, reset } from '../features/chats/chatsSlice';
import { io } from 'socket.io-client';
import { addMessage } from '../features/chats/chatsSlice';

const socket = io('http://localhost:3001');

const Chats = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { room } = useSelector((store) => store.chats);
  const { user } = useSelector((store) => store.auth);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    dispatch(reset());
    dispatch(getChat(id));
  }, [dispatch, id]);

  const [message, setMessage] = useState<string>('');

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const [open, setOpen] = useState(false);
  const openProfile = () => setOpen(true);
  const closeProfile = (payload: boolean) => setOpen(payload);

  const otherUser =
    room.user1 && room.user1.id === (user && user.id)
      ? room.user2
      : room.user2 && room.user2.id === (user && user.id)
      ? room.user1
      : null;

  useEffect(() => {
    socket.emit('join', id, user?.id || '');

    socket.on('message', (message) => {
      // setMessages((prevMessages) => [...prevMessages, message]);
      dispatch(addMessage(message));
      console.log(message);
    });

    return () => {
      socket.off('message');
      if (user) {
        socket.emit('leave', id, user?.id || '');
      }
    };
  }, [id, user]);

  return (
    <div className='h-screen flex-1 flex flex-col justify-between border-l border-l-sec'>
      <ChatHeader
        firstName={otherUser && otherUser.first_name}
        lastName={otherUser && otherUser.last_name}
        displayPhoto={otherUser && otherUser.display_photo}
        openProfile={openProfile}
      />
      <ChatsContent
        messages={room && room.chat_messages}
        first_name={user && user.first_name}
        last_name={user && user.last_name}
      />
      <ChatsInput
        name={user && user.first_name + ' ' + user.last_name}
        roomId={id}
        socket={socket}
        message={message}
        showPicker={showPicker}
        setMessage={setMessage}
        setShowPicker={setShowPicker}
        onChangeHandler={onChangeHandler}
      />
      <SlideOver
        profile={otherUser && otherUser}
        isOpen={open}
        closeProfile={closeProfile}
      />
    </div>
  );
};

export default Chats;
