// @ts-nocheck
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getContacts } from '../features/contacts/contactsSlice';

type Contacts = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  display_photo: string;
  about: string;
  createdAt: string;
  updatedAt: string;
};

const Inbox = () => {
  const dispatch = useDispatch();
  const { contacts, isLoading, isSuccess, isError, message } = useSelector(
    (store) => store.contacts
  );

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <div className='w-96 p-5 border-r border-r-background max-lg:hidden'>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Search or start new chat'
          className='input input-bordered focus:ring-primary focus:border-primary bg-inherit w-full'
        />
      </div>
      <div className='h-[95%] overflow-y-scroll'>
        {contacts.map((contact: Contacts[]) => (
          <div key={contact.id}>
            <NavLink
              to={`/chat/${contact.id}`}
              key={contact.id}
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive ? '#242424' : '',
                };
              }}
              className='flex items-center cursor-pointer p-2'
            >
              <div className='avatar p-1'>
                <div className='w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                  <img src={contact.display_photo} />
                </div>
              </div>
              <div className='flex-1 px-2'>
                <div className='flex items-center justify-between'>
                  <div className='font-bold text-lg capitalize'>
                    {contact.first_name} {contact.last_name}
                  </div>
                  <div className='text-xs text-gray-500'>3:21 pm</div>
                </div>
                <div className='text-gray-500'>message</div>
              </div>
            </NavLink>
            <hr className='border-background' />
          </div>
        ))}
      </div>
      {/* <div className='flex items-center cursor-pointer p-2 rounded border'>
        <div className='avatar p-1'>
          <div className='w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
            <img src='https://preview.redd.it/dh5otp8kcf741.png?width=640&crop=smart&auto=webp&s=d795f12b5e3eea1ef4d7ceb8244fca98e2384dbf' />
          </div>
        </div>
        <div className='flex-1 px-2'>
          <div className='flex items-center justify-between'>
            <div className='font-bold text-lg'>habib</div>
            <div className='text-xs text-gray-500'>3:21 pm</div>
          </div>
          <div className='text-gray-500'>message</div>
        </div>
      </div> */}
      {/* <hr className='border-background' />
      <div className='flex items-center bg-background p-2 cursor-pointer rounded'>
        <div className='avatar p-1'>
          <div className='w-10 h-10 rounded-full'>
            <img src='https://preview.redd.it/dh5otp8kcf741.png?width=640&crop=smart&auto=webp&s=d795f12b5e3eea1ef4d7ceb8244fca98e2384dbf' />
          </div>
        </div>
        <div className='flex-1 px-2'>
          <div className='flex items-center justify-between'>
            <div className='font-bold text-lg'>ashie</div>
            <div className='text-xs text-gray-500'>12:30 pm</div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='text-primary'>message</div>
            <span className='flex w-3 h-3 bg-primary rounded-full'></span>
          </div>
        </div>
      </div>
      <hr className='border-background' /> */}
    </div>
  );
};

export default Inbox;
