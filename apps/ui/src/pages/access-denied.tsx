import { Button } from '@mui/joy';
import { useNavigate } from 'react-router';

export default function AccessDenied() {
  const navigate = useNavigate();
  const handleRedirect = () => navigate('/');

  return (
    <main className='flex flex-col items-center p-4'>
      <span className='mb-2'>access-denied</span>
      <Button
        className='w-fit'
        variant='outlined'
        onClick={handleRedirect}
      >
        Home
      </Button>
    </main>
  );
}
