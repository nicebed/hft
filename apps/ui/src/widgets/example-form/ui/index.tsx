import { z } from 'zod';
import { Form } from '@app/shared/ui/form';
import { Input } from '@app/shared/ui/input';
import { ExampleSchema } from '../config';
import { DatePicker } from '@app/shared/ui/date-picker';

export const ExampleForm = () => {
  const handleSubmit = async (data: z.infer<typeof ExampleSchema>) => {
    console.log(data);
  };

  return (
    <Form
      schema={ExampleSchema}
      onSubmit={handleSubmit}
      submitText='Submit'
      className='mt-10 w-full md:w-[60%] lg:w-[21%]'
    >
      <Input
        name='name'
        label='Name'
        type='text'
      />
      <Input
        name='cats'
        label='How much Cats do you have?'
        type='number'
      />
      <DatePicker
        name='date'
        label='Date of Birth'
      />
      <Input
        name='email'
        label='Email'
        type='email'
      />
      <Input
        name='password'
        label='Password'
        type='password'
      />
    </Form>
  );
};
