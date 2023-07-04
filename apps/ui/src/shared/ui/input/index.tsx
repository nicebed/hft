import { forwardRef } from 'react';
import { FieldError, FieldErrorsImpl, Merge, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  classNames?: string;
  type?: 'text' | 'password' | 'email' | 'number';
}

export const Input = forwardRef<HTMLInputElement, Props>(({ name, disabled, ...props }) => {
  const {
    register,
    formState: { isSubmitting, errors },
  } = useFormContext();
  const error = errors[name]?.message;

  return (
    <TextField
      helperText={<Error message={error} />}
      error={!!error}
      disabled={isSubmitting || disabled}
      size='small'
      {...register(name)}
      {...props}
    />
  );
});

const Error = ({
  message,
}: {
  message: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}) => (message ? <span>{message?.toString()}</span> : null);
