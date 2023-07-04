import { ZodType, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { SubmitError } from './submit-error';
import { FormProps } from './types';
import { ForwardedRef, forwardRef } from 'react';
import { Button, CircularProgress } from '@mui/joy';
import clsx from 'clsx';

export const Form = forwardRef(FormElement) as <S extends ZodType<any, any>>(
  props: FormProps<S> & { ref?: ForwardedRef<HTMLFormElement> }
) => ReturnType<typeof FormElement>;

function FormElement<S extends ZodType<any, any>>(
  {
    schema,
    onSubmit,
    errorMessage,
    submitText,
    children,
    isLoading,
    className,
    ...props
  }: FormProps<S>,
  ref: ForwardedRef<HTMLFormElement>
) {
  const ctx = useForm<z.infer<S>>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
  });

  const handleSubmit = ctx.handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <FormProvider {...ctx}>
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className={clsx(className, 'flex flex-col gap-5')}
        {...props}
      >
        {children}

        {submitText ? (
          <div className='flex flex-col items-center'>
            <Button
              className='w-full'
              variant='soft'
              type='submit'
              // disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress
                  variant='soft'
                  size='sm'
                />
              ) : (
                submitText
              )}
            </Button>

            <SubmitError message={errorMessage} />
          </div>
        ) : null}
      </form>
    </FormProvider>
  );
}
