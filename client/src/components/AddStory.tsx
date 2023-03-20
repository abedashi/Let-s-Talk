// @ts-nocheck
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getMyStorys, addStory, reset } from '../features/storys/storysSlice';
import { TbFaceIdError } from 'react-icons/tb';
import Carousel from './ui/Carousel';

type StoryForm = {
  url: string;
  content: string;
};

const AddStory = () => {
  const dispatch = useDispatch();
  const { images, isSuccess, isError, message } = useSelector(
    (store) => store.storys
  );

  useEffect(() => {
    if (isError) toast.error(message);

    if (isSuccess) {
      toast.success(message);
    }

    dispatch(reset());
  }, [images, isError, message, isSuccess]);

  useEffect(() => {
    dispatch(getMyStorys());
  }, [dispatch]);

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

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (url.trim().length === 0 || content.trim().length === 0)
      return toast.error('please add all fields!');

    await dispatch(addStory(storyForm));
    dispatch(getMyStorys());

    setStoryForm((prevState) => {
      return {
        ...prevState,
        url: '',
        content: '',
      };
    });
  };

  return (
    <div className=' flex-1 h-screen'>
      <form
        onSubmit={onSubmitHandler}
        className='flex flex-col items-center justify-center gap-5 h-[50%]'
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
      <div className='h-[50%] overflow-y-scroll'>
        <h1 className='signika_bold text-3xl text-center mb-3'>My Storys</h1>
        {images !== null ? (
          <Carousel images={images} />
        ) : (
          <div className='mt-10 flex  items-center justify-center gap-3 text-2xl'>
            <TbFaceIdError className='w-8 h-8' /> Your list is empty!
          </div>
        )}
      </div>
    </div>
  );
};

export default AddStory;
