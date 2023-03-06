import React from 'react';
import Chats from './components/Chats';
import Inbox from './components/Inbox';
import SideBar from './components/ui/SideBar';

const App = () => {
  return (
    <div className='flex bg-[#1b1b1b]'>
      <SideBar />
      <Inbox />
      <Chats />
    </div>
  );
};

export default App;
