// @ts-nocheck
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStoryImages, reset } from '../features/storys/storysSlice';
import { TbFaceIdError } from 'react-icons/tb';
import Carousel from './ui/Carousel';

const StorysShow = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { images } = useSelector((store) => store.storys);

  useEffect(() => {
    dispatch(reset());
    dispatch(getStoryImages(id));
  }, [id, dispatch]);

  return (
    <>
      {images !== null && images.length > 0 ? (
        <>
          {/* {images.story.user.first_name} */}
          <Carousel images={images} />
        </>
      ) : (
        <div className='mt-10 flex items-center justify-center gap-3 text-2xl'>
          <TbFaceIdError className='w-12 h-12' />
        </div>
      )}
    </>
  );
};

export default StorysShow;
