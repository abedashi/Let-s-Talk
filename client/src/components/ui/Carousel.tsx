const Carousel = ({ images = [] }) => {
  return (
    <div className='px-10'>
      <div className='carousel-container w-full h-96 rounded'>
        <div className='carousel w-full h-full'>
          {images.map(
            (
              image: {
                url: string;
                content: string;
                story: { user: { first_name: string; last_name: string } };
              },
              index
            ) => (
              <div
                key={index}
                className='carousel-item relative w-full h-full rounded'
              >
                <img
                  src={image.url}
                  className='w-full h-full object-cover cursor-pointer rounded'
                  alt=''
                  onClick={() => window.open(image.url, '_blank')}
                />
                <div className='carousel-caption absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50'>
                  <h3 className='text-white'>
                    {image.story.user.first_name} {image.story.user.last_name}{' '}
                    Image {index + 1}
                  </h3>
                  <p className='text-white'>{image.content}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
