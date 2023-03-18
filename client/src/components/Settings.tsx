// @ts-nocheck
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUser, reset, me } from '../features/auth/authSlice';

type SettingsForm = {
  display_photo: string;
  about: string;
};

const Settings = () => {
  const dispatch = useDispatch();
  const { user, isSuccess, isError, message } = useSelector(
    (store) => store.auth
  );

  useEffect(() => {
    if (isError) toast.error(message);

    if (isSuccess) {
      toast.success(message);
    }

    dispatch(reset());
  }, [user, isError, message, isSuccess, dispatch]);

  const [settingsForm, setSettingsForm] = useState<SettingsForm>({
    display_photo: '',
    about: user.about,
  });

  const { display_photo, about } = settingsForm;

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setSettingsForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (display_photo.trim().length > 0 || about.trim().length > 0) {
      await dispatch(updateUser(settingsForm));
      dispatch(me());
    } else {
      toast.error('Atleast one field should be updated!');
    }
    setSettingsForm((prevState) => {
      return {
        ...prevState,
        display_photo: '',
        about: about,
      };
    });
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex-1 flex flex-col items-center justify-center gap-5'
    >
      <input
        type='url'
        name='display_photo'
        placeholder='Display Photo URL'
        autoComplete='off'
        className='input input-bordered input-lg focus:border-primary max-md:w-[90%] focus:ring-primary mb-3 bg-inherit hover:bg-background w-[45%]'
        onChange={onChangeHandler}
        value={display_photo}
      />
      <textarea
        className='textarea textarea-bordered w-[45%] focus:border-primary max-md:w-[90%] focus:ring-primary mb-3 bg-inherit hover:bg-background'
        placeholder='Bio'
        name='about'
        onChange={onChangeHandler}
        value={about}
        rows={10}
      ></textarea>
      <button className='btn btn-wide bg-primary max-sm:w-[90%]'>Save</button>
    </form>
  );
};

export default Settings;
