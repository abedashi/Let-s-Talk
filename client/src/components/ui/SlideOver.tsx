import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type Props = {
  isOpen: boolean;
  closeProfile: (payload: boolean) => void;
};

const SlideOver: React.FC<Props> = ({ isOpen, closeProfile }) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeProfile}>
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='pointer-events-auto relative w-screen max-w-md'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-500'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-500'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <div className='absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4'>
                      <button
                        type='button'
                        className='rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white'
                        onClick={() => closeProfile(false)}
                      >
                        <span className='sr-only'>Close panel</span>
                        <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className='flex h-full flex-col overflow-y-scroll bg-primary py-6 shadow-xl'>
                    <div className='px-4 sm:px-6'>
                      <Dialog.Title className='text-lg font-medium text-white'>
                        profile
                      </Dialog.Title>
                    </div>
                    <div className='relative mt-6 flex-1 px-4 sm:px-6'>
                      {/* Replace with your content */}
                      <div className='absolute inset-0 px-4 sm:px-6'>
                        <div
                          className='h-full border-2 border-dashed border-gray-200 p-5'
                          aria-hidden='true'
                        >
                          <div className='flex flex-col items-center gap-4'>
                            <img
                              className='w-40 h-40 rounded-lg mt-2'
                              src='https://preview.redd.it/dh5otp8kcf741.png?width=640&crop=smart&auto=webp&s=d795f12b5e3eea1ef4d7ceb8244fca98e2384dbf'
                              alt='profile img'
                            />
                            <div className='mb-16 font-bold text-lg'>ashie</div>
                          </div>
                          <div className='text-gray-500 font-semibold'>
                            <span>About:</span>
                            <p className='pl-3'>
                              Lorem ipsum dolor, sit amet consectetur
                              adipisicing elit. Est, harum labore molestiae
                              libero nobis nulla autem saepe ipsa debitis neque
                              dolorum, consequatur dolorem similique officia
                              sunt et natus earum sint!
                            </p>
                            <br />
                            <span>Phone no:</span>
                            <p className='pl-3'>+961(70024607)</p>
                          </div>
                        </div>
                      </div>
                      {/* /End replace */}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SlideOver;
