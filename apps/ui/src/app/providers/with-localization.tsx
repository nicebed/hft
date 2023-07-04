import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const withDateLocalization = (component: () => React.ReactNode) => () => {
  return <LocalizationProvider dateAdapter={AdapterDayjs}>{component()}</LocalizationProvider>;
};
