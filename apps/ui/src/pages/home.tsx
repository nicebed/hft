import { useNavigate } from 'react-router';
import { Button } from 'antd';

export default function Home() {
  const navigate = useNavigate();
  const handleRedirect = () => navigate('/auth/sign-up');

  return (
    <main className='flex flex-col items-center p-4'>
      <span className='mb-2'>react-base-app</span>
      <Button
        type='primary'
        className='w-fit mt-4'
        onClick={handleRedirect}
      >
        Signup
      </Button>
    </main>
  );
}
