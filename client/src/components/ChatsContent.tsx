import { useRef, useEffect } from 'react';

const ChatsContent = () => {
  const ul = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const myUl = ul.current;
    if (myUl) {
      myUl.scrollTop = myUl.scrollHeight;
    }
  }, []);

  return (
    <ul
      ref={ul}
      className='flex-1 bg-background p-5 overflow-y-scroll flex flex-col'
    >
      {/* me */}
      <li className='chat chat-end'>
        <div className='chat-header'>
          <time className='text-xs opacity-50'>2:01 am</time>
        </div>
        <div className='chat-bubble bg-primary'>I loved you.</div>
        <div className='chat-footer opacity-50'>Seen</div>
      </li>
      {/* me */}
      <li className='chat chat-end'>
        <div className='chat-header'>
          <time className='text-xs opacity-50'>2:01 am</time>
        </div>
        <div className='chat-bubble bg-primary'>I loved you.</div>
        <div className='chat-footer opacity-50'>Seen</div>
      </li>

      {/* guest */}
      <li className='chat chat-start'>
        <div className='chat-header'>
          <time className='text-xs opacity-50'>2:00 am</time>
        </div>
        <div className='chat-bubble bg-sec'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis,
          odit! Quas maxime, sit laboriosam exercitationem fugiat fugit. Ducimus
          sed dolorem rerum temporibus facere modi, ratione earum, cum nostrum,
          magnam voluptates!
        </div>
        {/* <div className='chat-footer opacity-50'>Seen</div> */}
      </li>

      {/* me */}
      <li className='chat chat-end'>
        <div className='chat-header'>
          <time className='text-xs opacity-50'>2:01 am</time>
        </div>
        <div className='chat-bubble bg-primary'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
          consectetur distinctio sequi modi minima magnam alias in praesentium
          cum ipsa iste corrupti, velit officiis necessitatibus doloremque nemo.
          Expedita, animi ex.
        </div>
        <div className='chat-footer opacity-50'>Seen</div>
      </li>
      <li className='chat chat-end'>
        <div className='chat-header'>
          <time className='text-xs opacity-50'>2:01 am</time>
        </div>
        <div className='chat-bubble bg-primary'>I loved you.</div>
        <div className='chat-footer opacity-50'>Seen</div>
      </li>
      {/* me */}
      <li className='chat chat-end'>
        <div className='chat-header'>
          <time className='text-xs opacity-50'>2:01 am</time>
        </div>
        <div className='chat-bubble bg-primary'>I loved you.</div>
        <div className='chat-footer opacity-50'>Seen</div>
      </li>

      {/* guest */}
      <li className='chat chat-start'>
        <div className='chat-header'>
          <time className='text-xs opacity-50'>2:00 am</time>
        </div>
        <div className='chat-bubble bg-sec'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis,
          odit! Quas maxime, sit laboriosam exercitationem fugiat fugit. Ducimus
          sed dolorem rerum temporibus facere modi, ratione earum, cum nostrum,
          magnam voluptates!
        </div>
        {/* <div className='chat-footer opacity-50'>Seen</div> */}
      </li>

      {/* me */}
      <li className='chat chat-end'>
        <div className='chat-header'>
          <time className='text-xs opacity-50'>2:01 am</time>
        </div>
        <div className='chat-bubble bg-primary'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
          consectetur distinctio sequi modi minima magnam alias in praesentium
          cum ipsa iste corrupti, velit officiis necessitatibus doloremque nemo.
          Expedita, animi ex.
        </div>
        <div className='chat-footer opacity-50'>Seen</div>
      </li>
      <li className='chat chat-end'>
        <div className='chat-header'>
          <time className='text-xs opacity-50'>2:01 am</time>
        </div>
        <div className='chat-bubble bg-primary'>I loved you.</div>
        <div className='chat-footer opacity-50'>Seen</div>
      </li>
      {/* me */}
      <li className='chat chat-end'>
        <div className='chat-header'>
          <time className='text-xs opacity-50'>2:01 am</time>
        </div>
        <div className='chat-bubble bg-primary'>I loved you.</div>
        <div className='chat-footer opacity-50'>Seen</div>
      </li>

      {/* guest */}
      <li className='chat chat-start'>
        <div className='chat-header'>
          <time className='text-xs opacity-50'>2:00 am</time>
        </div>
        <div className='chat-bubble bg-sec'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis,
          odit! Quas maxime, sit laboriosam exercitationem fugiat fugit. Ducimus
          sed dolorem rerum temporibus facere modi, ratione earum, cum nostrum,
          magnam voluptates!
        </div>
        {/* <div className='chat-footer opacity-50'>Seen</div> */}
      </li>

      {/* me */}
      <li className='chat chat-end'>
        <div className='chat-header'>
          <time className='text-xs opacity-50'>2:01 am</time>
        </div>
        <div className='chat-bubble bg-primary'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
          consectetur distinctio sequi modi minima magnam alias in praesentium
          cum ipsa iste corrupti, velit officiis necessitatibus doloremque nemo.
          Expedita, animi ex.
        </div>
        <div className='chat-footer opacity-50'>Delivered</div>
      </li>
    </ul>
  );
};

export default ChatsContent;
