import { Form } from '@app/shared/ui/form';
import { LoginSchema } from '../model/schemas';
import { z } from 'zod';
import { Input } from '@app/shared/ui/input';

export const LoginForm = () => {
  const login = async (credentials: z.infer<typeof LoginSchema>) => {
    console.log(credentials, 'Log In CREDENTIALS');
  };

  return (
    <Form
      schema={LoginSchema}
      onSubmit={login}
      submitText='Log In'
      className='w-full'
    >
      <Input
        name='email'
        label='Email'
        type='text'
      />
      <Input
        name='password'
        label='Password'
        type='password'
      />
    </Form>
  );
};
