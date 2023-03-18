import { Outlet } from 'react-router-dom';
import Inbox from '../components/Inbox';

const Main = () => {
  return (
    <>
      <Inbox />
      <Outlet />
    </>
  );
};

export default Main;
