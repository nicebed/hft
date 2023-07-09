import { Form } from '@app/shared/ui/form';
import { SignupSchema } from '../model/types/schemas';
import { z } from 'zod';
import { Input } from '@app/shared/ui/input';
import { DatePicker } from '@app/shared/ui/date-picker';

export const SignupForm = () => {
  const signup = async (credentials: z.infer<typeof SignupSchema>) => {
    console.log(credentials, 'SIGN UP CREDENTIALS');
  };

  return (
    <Form
      schema={SignupSchema}
      onSubmit={signup}
      submitText='Sign Up'
      className='w-full'
    >
      <Input
        name='nickname'
        label='Nickname'
        type='text'
      />
      <Input
        name='email'
        label='Email'
        type='text'
      />
      <DatePicker
        name='birthday'
        label='Date of birth'
      />
      <Input
        name='password'
        label='Password'
        type='password'
      />
      <Input
        name='confirmPassword'
        label='Confirm password'
        type='password'
        placeholder='Confirm your password'
      />
    </Form>
  );
};
