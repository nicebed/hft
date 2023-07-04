import { PropsWithoutRef, ReactNode } from 'react';
import { UseFormProps } from 'react-hook-form';
import { ZodAny, z } from 'zod';

export interface OnSubmitResult {
  FORM_ERROR?: string;
  [prop: string]: unknown;
}

export interface FormProps<S extends z.ZodType<ZodAny, ZodAny>>
  extends OmitStrict<PropsWithoutRef<JSX.IntrinsicElements['form']>, 'onSubmit'> {
  schema: S;
  onSubmit: (values: z.infer<S>) => Promise<void | OnSubmitResult>;
  isLoading?: boolean;
  errorMessage?: string | null | undefined;
  submitText?: string | undefined;
  additionalStyles?: string | undefined;
  children?: ReactNode | undefined;
  initialValues?: UseFormProps<z.infer<S>>['defaultValues'];
}

export const FORM_ERROR = 'FORM_ERROR';
