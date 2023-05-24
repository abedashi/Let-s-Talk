// @ts-nocheck
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStorys, reset } from '../../features/storys/storysSlice';
import { Outlet, useNavigate } from 'react-router-dom';

const Storys = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { storys, isLoading, isSuccess, isError, message } = useSelector(
    (store) => store.storys
  );

  useEffect(() => {
    dispatch(reset());
    dispatch(getStorys());
  }, [dispatch]);

  // if (isLoading) {
  //   return <Spinner text='fetching Users Storys' />;
  // }

  return (
    <div className='flex-1'>
      {storys !== null && storys.length > 0 ? (
        storys.map((story) => (
          <div className='flex items-center bg-background border-l border-l-sec p-5 gap-5 overflow-x-scroll'>
            <div
              className='avatar p-1'
              key={story.id}
              onClick={() => navigate(`/storys/${story.id}`)}
            >
              <div className='w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                <img src={story.user.display_photo} />
                <img />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className='flex items-center bg-background border-l border-l-sec p-5 gap-5 overflow-x-scroll'>
          <div className='avatar p-1'>
            <div className='w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
              <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Empty_set.svg/800px-Empty_set.svg.png' />
            </div>
          </div>
          <div>No Storys</div>
        </div>
      )}
      <div className='mt-20 h-max'>
        <Outlet />
      </div>
    </div>
  );
};

export default Storys;
