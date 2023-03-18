// @ts-nocheck
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/ui/Spinner';
import { toast } from 'react-toastify';

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isSuccess, isLoading, isError, message } = useSelector(
    (store) => store.auth
  );

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      loginForm.email.trim().length === 0 ||
      loginForm.password.trim().length === 0
    ) {
      return toast.error('Please add all fields!');
    }

    dispatch(login(loginForm));

    setLoginForm((prevState) => {
      return {
        ...prevState,
        email: '',
        password: '',
      };
    });
  };

  useEffect(() => {
    if (isError) toast.error(message);

    if (user) navigate('/');

    if (isSuccess) {
      navigate('/otp');
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
      <Link to='/signup' className='w-max mx-auto pt-2'>
        or Sign up
      </Link>
      <div className='flex items-center justify-center h-full'>
        <form
          onSubmit={onSubmitHandler}
          className='flex flex-col items-center space-y-10 p-2'
        >
          <div>
            <input
              type='email'
              name='email'
              placeholder='Email'
              autoComplete='off'
              className='input input-bordered input-lg w-full focus:border-primary focus:ring-primary mb-3 bg-inherit hover:bg-sec'
              onChange={onChangeHandler}
              value={loginForm.email}
            />
            <input
              type='password'
              name='password'
              placeholder='Password'
              autoComplete='off'
              className='input input-bordered input-lg w-full focus:border-primary focus:ring-primary bg-inherit hover:bg-sec'
              onChange={onChangeHandler}
              value={loginForm.password}
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

export default Login;
