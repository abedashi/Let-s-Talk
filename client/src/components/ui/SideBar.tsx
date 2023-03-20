// @ts-nocheck
import { NavLink, useParams } from 'react-router-dom';
import {
  HiOutlineChatBubbleBottomCenterText,
  HiViewfinderCircle,
} from 'react-icons/hi2';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { VscSettings } from 'react-icons/vsc';
import { useSelector } from 'react-redux';

type Props = {
  onLogouthandler: () => void;
};

const SideBar: React.FC<Props> = ({ onLogouthandler }) => {
  const { user } = useSelector((store) => store.auth);
  const { id } = useParams();
  const newPathname = `/storys/${id}`;

  return (
    <div className='w-20 bg-background h-screen pt-5 pb-5 flex flex-col overflow-y-auto justify-between'>
      <img
        src='https://images.squarespace-cdn.com/content/v1/5b97ee75b27e391dae45e96e/1538126215679-ES6NOSJZSQ6WYBOKA2GJ/LetsTalk_Landscape_Black.png'
        alt='lets talk'
      />
      <div className='flex flex-col items-center gap-10'>
        {location.pathname === '/storys' ||
        location.pathname === '/add-story' ||
        location.pathname === '/storys/start' ||
        location.pathname === newPathname ? (
          <NavLink
            to='/add-story'
            style={({ isActive }) => {
              return {
                color: isActive ? '#5E20DD' : 'white',
              };
            }}
          >
            <AiOutlinePlusCircle className='w-6 h-6 cursor-pointer' />
          </NavLink>
        ) : (
          ''
        )}
        <NavLink
          to='/chat'
          style={({ isActive }) => {
            return {
              color: isActive ? '#5E20DD' : 'white',
            };
          }}
        >
          <HiOutlineChatBubbleBottomCenterText className='w-6 h-6 cursor-pointer' />
        </NavLink>

        <NavLink
          to='/storys'
          style={({ isActive }) => {
            return {
              color: isActive ? '#5E20DD' : 'white',
            };
          }}
        >
          <HiViewfinderCircle className='w-6 h-6 cursor-pointer' />
        </NavLink>

        <NavLink
          to='/settings'
          style={({ isActive }) => {
            return {
              color: isActive ? '#5E20DD' : 'white',
            };
          }}
        >
          <VscSettings className='w-6 h-6 cursor-pointer' />
        </NavLink>

        <RiLogoutCircleLine
          onClick={onLogouthandler}
          className='w-6 h-6 cursor-pointer hover:text-primary'
        />
        <NavLink to='/chat/profile'>
          <img
            className='w-10 h-10 rounded cursor-pointer'
            src={user ? user.display_photo : ''}
            alt='Default avatar'
          />
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
