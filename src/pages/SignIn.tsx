import { useEffect, useRef, useState } from 'react';
import { motion as m } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { readFile } from '../utils/ioUtils';
import { useAuth } from '../context/authContext';

const renderError = (error: string) => (
  <p className='h-3.5 text-red-600 italic text-sm'>{error}</p>
);

const SignIn = () => {
  const [errors, setErrors] = useState({ email: '', password: '', form: '' });
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated]);

  const validateEmail = () => {
    const email = emailRef?.current?.value || '';

    if (!email) {
      setErrors((prevError) => ({
        ...prevError,
        email: email ? '' : 'Email is required',
      }));
      return false;
    }

    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Email has incorrect format',
      }));
      return false;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      email: '',
    }));
    return true;
  };

  const validatePassword = () => {
    const password = passwordRef?.current?.value || '';

    if (!password)
      setErrors((prevError) => ({
        ...prevError,
        password: password ? '' : 'Password is required',
      }));
    else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: '',
      }));
      return true;
    }
    return false;
  };

  const authenticateUser = async () => {
    const users = (await readFile()) || [];

    for (let i = 0; i < users.length; i++) {
      const [email, password] = users[i].split(' ');

      if (
        email === emailRef?.current?.value &&
        password === passwordRef?.current?.value
      ) {
        login();
        navigate('/dashboard');
      }
    }
    setErrors((prevError) => ({
      ...prevError,
      form: 'Incorrect Email or Password',
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    if (isEmailValid && isPasswordValid) authenticateUser();
  };

  if (isAuthenticated) return <div className='w-screen h-screen bg-cream ' />;
  return (
    <div className='flex flex-row h-screen bg-cream'>
      <div className='flex basis-1/2 justify-center items-center'>
        <m.div
          className='cursor-default'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 1 }}
        >
          <h1 className='text-6xl text-black'>
            {' '}
            <span className='text-secondary'>Sign In</span> to track
          </h1>
          <h1 className='text-6xl text-black'>
            your <span className='text-primary'>Transactions</span>
          </h1>
        </m.div>
      </div>
      <div className='flex basis-1/2 justify-center items-center '>
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 1 }}
        >
          <form className='flex flex-col' onSubmit={(e) => handleSubmit(e)}>
            {renderError(errors?.form)}
            <input
              type='text'
              className='w-[28rem] px-2 py-1 mt-4 text-lg text-gray-800 bg-white rounded-md outline-none border-2 border-transparent focus:border-primary'
              placeholder='Email'
              ref={emailRef}
            />
            {renderError(errors?.email)}
            <input
              className='mt-4 w-[28rem] px-2 py-1 text-lg text-gray-800 bg-white rounded-md outline-none border-2 border-transparent focus:border-primary'
              type='password'
              placeholder='Password'
              ref={passwordRef}
            />
            {renderError(errors?.password)}
            <button className='w-fit mt-8 px-4 py-2 rounded-md bg-transparent text-lg hover:bg-secondary text-secondary hover:text-white border-solid border-2 border-secondary transition-all'>
              Sign In
            </button>
          </form>
        </m.div>
      </div>
    </div>
  );
};

export default SignIn;
