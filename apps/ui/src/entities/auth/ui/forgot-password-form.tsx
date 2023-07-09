import { Form } from '@app/shared/ui/form';
import { ForgotPasswordSchema } from '../model/types/schemas';
import { Input } from '@app/shared/ui/input';
import { z } from 'zod';
import { Typography } from 'antd';

export const ForgotPasswordForm = () => {
  const sendCode = async (credentials: z.infer<typeof ForgotPasswordSchema>) => {
    console.log(credentials, 'Forgot Password CREDENTIALS');
  };

  return (
    <Form
      schema={ForgotPasswordSchema}
      onSubmit={sendCode}
      submitText='Send Key'
      className='w-full'
    >
      <Typography>Please, enter your email, we'll send you a secret key.</Typography>
      <Input
        name='email'
        type='text'
      />
    </Form>
  );
};
