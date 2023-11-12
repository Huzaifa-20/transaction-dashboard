import { useLocation } from 'react-router-dom';

const SecondaryScreen = () => {
  const { state } = useLocation();

  return (
    <div className='flex flex-col w-screen h-screen bg-cream justify-center items-center'>
      <h1 className='text-6xl'>
        <span className='text-secondary'>{state.screenName}</span> with
      </h1>
      <h1 className='text-6xl text-primary'>{state.transactionId}</h1>
    </div>
  );
};

export default SecondaryScreen;
