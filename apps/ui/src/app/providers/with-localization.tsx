import { type ReactNode } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const withDateLocalization = (component: () => ReactNode) => () => {
  return <LocalizationProvider dateAdapter={AdapterDayjs}>{component()}</LocalizationProvider>;
};
