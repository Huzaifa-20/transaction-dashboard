import logo from '../assets/logo.png';
import avatar from '../assets/avatar.png';

const TopBar = () => (
  <div
    className='py-4 px-8 flex justify-between  items-center bg-white '
    style={{ boxShadow: '0 2px 6px -4px rgba(0, 0, 0, 0.1)' }}
  >
    <img src={logo} alt='Logo' />
    <div className='flex justify-center items-center'>
      <img
        className={`rounded-full object-cover h=10 w-10`}
        src={avatar}
        alt='avatar'
      />
    </div>
  </div>
);

export default TopBar;
