import { Button } from '@mui/joy';
import { ExampleForm } from '@app/widgets/example-form';
import { useNavigate } from 'react-router';

export default function Home() {
  const navigate = useNavigate();
  const handleRedirect = () => navigate('/settings');

  return (
    <main className='flex flex-col items-center p-4'>
      <span className='mb-2'>react-base-app</span>
      <Button
        className='w-fit'
        variant='outlined'
        onClick={handleRedirect}
      >
        Settings
      </Button>

      <ExampleForm />
    </main>
  );
}
