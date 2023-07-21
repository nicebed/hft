import { COUNTRY_PHONE_CODES } from '@app/shared/config/phone-codes';
import { formatPhoneNumber } from '@app/shared/lib/format-phone-number';
import { Country, PhoneNumber } from '@app/shared/types';
import { Input } from 'antd';

interface Props {
  country: Country | undefined;
  value: string | undefined;
  onChange: (value: PhoneNumber) => void;
  className?: string;
}

export const PhoneInput = ({ country, value, onChange, className }: Props) => {
  const handleChange = (value: string) => {
    if (!country || typeof value === 'undefined') return;
    onChange(formatPhoneNumber({ value, country }));
  };

  return (
    <Input
      prefix={country ? <span>{COUNTRY_PHONE_CODES[country]}</span> : null}
      placeholder={country ? undefined : 'Please, specify your location'}
      size='large'
      allowClear
      className={className}
      value={value ?? ''}
      disabled={!country}
      onChange={({ target }) => handleChange(target.value)}
    />
  );
};
