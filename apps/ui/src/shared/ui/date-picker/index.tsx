import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers';

interface Props {
  name: string;
  label: string;
}

export const DatePicker = ({ name, label }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <MuiDatePicker
          label={label}
          onChange={(event) => onChange(dayjs((event as any).$d).format('DD-MM-YYYY-Z'))}
        />
      )}
    />
  );
};
