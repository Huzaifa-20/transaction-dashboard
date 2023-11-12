import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import TopBar from '../components/TopBar';
import Table from '../components/Table';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) navigate('/signin');
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  if (!isAuthenticated) return <div className='w-screen h-screen bg-cream ' />;

  return (
    <div className='flex flex-col h-screen bg-cream bg-opacity-30  '>
      <TopBar />
      <div className='flex flex-row h-full overflow-hidden'>
        <div
          className='flex flex-col justify-between h-full w-[10%] pt-10 pb-6 bg-white'
          style={{ boxShadow: '2px 0 6px -4px rgba(0, 0, 0, 0.1)' }}
        >
          <div className='text-lg text-white pl-8 py-2 cursor-pointer bg-secondary'>
            Transactions
          </div>
          <div
            className='text-lg text-secondary pl-8 p-2 cursor-pointer'
            onClick={handleLogout}
          >
            Log Out
          </div>
        </div>

        <div className='flex flex-col w-[90%] mt-1 overflow-y-auto'>
          <h1 className='text-xl pt-12 px-12'>Your Transactions</h1>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
