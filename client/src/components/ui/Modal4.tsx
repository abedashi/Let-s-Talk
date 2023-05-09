// @ts-nocheck
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, addChatRoom } from '../../features/chats/chatsSlice';

type Props = {
  modal: string;
};

const Modal4: React.FC<Props> = ({ modal }) => {
  const dispatch = useDispatch();
  const { contacts } = useSelector((store) => store.chats);
  const [contact, setContact] = useState('');

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const onChangeHandler = (event) => setContact(event.target.value);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    dispatch(addChatRoom(contact));
    console.log(contact);
  };

  return (
    <>
      <input type='checkbox' id={modal} className='modal-toggle' />
      <label htmlFor={modal} className='modal cursor-pointer'>
        <label className='modal-box bg-background relative' htmlFor=''>
          <form onSubmit={onSubmitHandler}>
            <h3 className='text-lg font-bold'>Add {modal}</h3>

            {modal === 'chat' && (
              <select
                name='contact'
                value={contact}
                onChange={onChangeHandler}
                className='select select-bordered bg-sec border-primary focus:border-primary focus:ring-primary mt-3 w-full'
              >
                <option defaultValue='' className='bg-sec'>
                  Choose a user
                </option>
                {contacts &&
                  contacts.length > 0 &&
                  contacts.map((contact) => {
                    return (
                      <option value={contact.id} key={contact.id}>
                        {contact.first_name + ' ' + contact.last_name}
                      </option>
                    );
                  })}
              </select>
            )}

            <div className='flex items-center justify-center'>
              <button className='btn btn-wide bg-primary border-primary hover:bg-sec hover:border-sec mt-5'>
                Add {modal}
              </button>
            </div>
          </form>
        </label>
      </label>
    </>
  );
};

export default Modal4;
