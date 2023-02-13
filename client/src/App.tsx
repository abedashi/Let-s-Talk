import React from 'react';
import Chats from './components/Chats';
import Inbox from './components/Inbox';
import SideBar from './components/ui/SideBar';

const App = () => {
  return (
    <div className='flex'>
      <SideBar />
      <Inbox />
      <Chats />
    </div>
  );
};

export default App;
