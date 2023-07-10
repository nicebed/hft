import { Icon } from '@app/shared/ui/icon';
import { Button } from 'antd';
import { useNavigate } from 'react-router';

export const AuthActionButton = () => {
  const session = false;
  const navigate = useNavigate();

  const handleRedirectToSignIn = () => navigate('/auth/sign-in');
  const handleLogout = () => 0; // TODO set effect

  if (!session) {
    return (
      <Button
        type='primary'
        className='w-full'
        onClick={handleRedirectToSignIn}
      >
        Sign In
      </Button>
    );
  }

  if (session) {
    return (
      <Button
        danger
        type='text'
        className='w-full flex items-center justify-center bg-red-100/20 hover:bg-red-100/70'
        onClick={handleLogout}
      >
        <Icon
          name='logout'
          section='primary'
          className='w-4 h-4 text-[#ff7889] mr-[9px] -mb-[1px]'
        />
        Log Out
      </Button>
    );
  }
};
