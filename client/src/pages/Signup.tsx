// @ts-nocheck
import { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signup, reset } from '../features/auth/authSlice';
import Spinner from '../components/ui/Spinner';
import { toast } from 'react-toastify';
import Input from '../components/ui/Input';

type LoginForm = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  confirm_password: string;
};

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isSuccess, isLoading, isError, message } = useSelector(
    (store) => store.auth
  );

  const [signupForm, setSignupForm] = useState<LoginForm>({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirm_password: '',
  });

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignupForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      signupForm.email.trim().length === 0 ||
      signupForm.first_name.trim().length === 0 ||
      signupForm.last_name.trim().length === 0 ||
      signupForm.password.trim().length === 0 ||
      signupForm.confirm_password.trim().length === 0
    )
      return toast.error('Please add all fields!');

    if (signupForm.password.trim() !== signupForm.confirm_password.trim())
      return toast.error('Password and password confirmation not matched');

    if (signupForm.password.length < 6)
      return toast.error('Password must be at least 6 characters');

    console.log(signupForm);
    dispatch(signup(signupForm));

    setSignupForm((prevState) => {
      return {
        ...prevState,
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        confirm_password: '',
      };
    });
  };

  useEffect(() => {
    if (isError) toast.error(message);

    if (user) navigate('/');

    if (isSuccess) {
      navigate('/');
      toast.success(message.message);
    }

    dispatch(reset());
  }, [user, isSuccess, isError, message, dispatch, navigate]);

  if (isLoading) return <Spinner text='Sending Code Process' />;

  return (
    <div className='h-screen bg-background flex flex-col p-4'>
      <h1 className='text-4xl signika_bold text-center pt-28'>
        Let's Talk Log In
      </h1>
      <Link to='/login' className='w-max mx-auto pt-2'>
        Log In
      </Link>
      <div className='flex items-center justify-center h-full'>
        <form
          onSubmit={onSubmitHandler}
          className='flex flex-col items-center space-y-10 p-2'
        >
          <Input
            type='email'
            name='email'
            placeholder='Email'
            onChangeHandler={onChangeHandler}
            value={signupForm.email}
          />

          <div>
            <Input
              type='text'
              name='first_name'
              placeholder='First Name'
              margin='mb-3'
              onChangeHandler={onChangeHandler}
              value={signupForm.first_name}
            />
            <Input
              type='text'
              name='last_name'
              placeholder='Last Name'
              onChangeHandler={onChangeHandler}
              value={signupForm.last_name}
            />
          </div>

          <div>
            <Input
              type='password'
              name='password'
              placeholder='Password'
              margin='mb-3'
              onChangeHandler={onChangeHandler}
              value={signupForm.password}
            />
            <Input
              type='password'
              name='confirm_password'
              placeholder='Confirm Password'
              onChangeHandler={onChangeHandler}
              value={signupForm.confirm_password}
            />
          </div>
          <button className='btn btn-block bg-primary signika_semibold text-xl border-primary capitalize'>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
