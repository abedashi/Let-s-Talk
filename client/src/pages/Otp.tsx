// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { loginVerify, reset } from '../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/ui/Spinner';

let currenOTPIndex: number = 0;

const OTPField = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isSuccess, isLoading, isError, message } = useSelector(
    (store) => store.auth
  );

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeHandler = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = target;
    const newOTP: string[] = [...otp];
    newOTP[currenOTPIndex] = value.substring(value.length - 1);

    if (!value) setActiveOTPIndex(currenOTPIndex - 1);
    else setActiveOTPIndex(currenOTPIndex + 1);

    setOtp(newOTP);
  };

  const onkeydownHandler = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    currenOTPIndex = index;
    if (key === 'Backspace') setActiveOTPIndex(currenOTPIndex - 1);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  useEffect(() => {
    if (isError) toast.error(message);

    if (isSuccess || user) navigate('/');

    dispatch(reset());
  }, [user, message, isSuccess, isError, navigate, dispatch]);

  useEffect(() => {
    // check if all elements in the `otp` array have a value
    const isOtpFilled = otp.every((value) => value !== '');

    if (isOtpFilled) {
      if (otp.join('').length === 6) {
        dispatch(loginVerify({ code: otp.join('') }));
      } else {
        toast.error('Enter your code');
      }
      setOtp(new Array(6).fill(''));
    }
  }, [otp, dispatch]);

  if (isLoading) return <Spinner text={'Logging In'} />;

  return (
    <div className='h-screen bg-background flex flex-col p-4'>
      <h1 className='text-center text-4xl signika_bold pt-28'>
        Verification Code Sent
      </h1>
      <div className='flex flex-col justify-center items-center h-full'>
        <form className='flex flex-col items-center gap-10 p-2'>
          <div className='flex justify-center items-center space-x-2'>
            {otp.map((_, index) => {
              return (
                <React.Fragment key={index}>
                  <input
                    ref={index === activeOTPIndex ? inputRef : null}
                    type='number'
                    className='otp-inputs max-sm:w-10 max-sm:h-10 max-lg:w-14 max-lg:h-14 max-sm:border-1 max-lg:border-1.5'
                    onChange={onChangeHandler}
                    onKeyDown={(e) => onkeydownHandler(e, index)}
                    value={otp[index]}
                  />
                  {index === otp.length - 1 ? null : (
                    <span className='w-2 py-0.5 bg-gray-400' />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPField;
