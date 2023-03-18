// @ts-nocheck
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getStory, addStory, reset } from '../features/storys/storysSlice';

type StoryForm = {
  url: string;
  content: string;
};

const AddStory = () => {
  const dispatch = useDispatch();
  const { storys, isSuccess, isError, message } = useSelector(
    (store) => store.auth
  );

  useEffect(() => {
    if (isError) toast.error(message);

    if (isSuccess) {
      toast.success(message);
    }

    dispatch(getStory());
    dispatch(reset());
  }, [storys, isError, message, isSuccess, dispatch]);

  const [storyForm, setStoryForm] = useState<StoryForm>({
    url: '',
    content: '',
  });

  const { url, content } = storyForm;

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setStoryForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (url.trim().length === 0 || content.trim().length === 0)
      return toast.error('please add all fields!');

    dispatch(addStory(storyForm));

    setStoryForm((prevState) => {
      return {
        ...prevState,
        url: '',
        content: '',
      };
    });
  };

  return (
    <div className='border flex-1'>
      <form
        onSubmit={onSubmitHandler}
        className='flex flex-col items-center justify-center border gap-5'
      >
        <h1 className='mt-10 signika_bold text-3xl'>Add Storys</h1>
        <input
          type='url'
          name='url'
          placeholder='Story Photo URL'
          autoComplete='off'
          className='input input-bordered input-lg focus:border-primary max-md:w-[90%] focus:ring-primary mb-3 bg-inherit hover:bg-background w-[45%]'
          onChange={onChangeHandler}
          value={url}
        />
        <textarea
          className='textarea textarea-bordered w-[45%] focus:border-primary max-md:w-[90%] focus:ring-primary mb-3 bg-inherit hover:bg-background'
          placeholder='content'
          name='content'
          onChange={onChangeHandler}
          value={content}
          rows={5}
        ></textarea>
        <button className='btn btn-wide bg-primary max-sm:w-[90%]'>Add</button>
      </form>
      <h1 className='signika_bold text-3xl'>My Storys</h1>
    </div>
  );
};

export default AddStory;
