import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className='hero min-h-screen bg-background'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h1 className='text-4xl signika_bold'>Ops! 404 Page Not Found</h1>
          <Link to='/chat'>
            <button className='btn btn-primary mt-4'>Get Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
