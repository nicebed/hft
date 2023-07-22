import { Radio } from '@app/shared/ui/radio';
import { RadioOptions } from '@app/shared/ui/radio/types';
import { CountrySelector } from '@app/widgets/country-selector/ui';
import { CountrySelectorOptions } from '@app/widgets/country-selector/types';
import { useState } from 'react';
import { PhoneInput } from '@app/widgets/phone-input/ui';
import { type PhoneNumber, type Country } from '@app/shared/types';

export default function SignIn() {
  const [country, setCountry] = useState<Country | undefined>();
  const [value, setValue] = useState<string>();

  const handleCountryChange = (country: Country) => {
    setCountry(country);
    setValue('');
  };

  const handlePhoneChange = (value: PhoneNumber) => {
    setValue(value);
  };

  const handleChangeCommunicationProvide = (
    provider: (typeof Messenger)[keyof typeof Messenger]
  ) => {
    console.log(provider);
  };

  return (
    <main className='flex flex-col w-full items-center pt-16 space-y-7'>
      <Radio
        options={options}
        onChange={handleChangeCommunicationProvide}
        // defaultChecked='TELEGRAM'
      />

      <div className='flex space-x-4'>
        <CountrySelector
          countryOptions={countryOptions}
          onChange={handleCountryChange}
          className='w-64'
        />

        <PhoneInput
          country={country}
          value={value}
          onChange={handlePhoneChange}
          className='w-64'
        />
      </div>
    </main>
  );
}

const countryOptions = [
  { value: 'united-kingdom', label: 'United Kingdom' },
  { value: 'france', label: 'France' },
  { value: 'ukraine', label: 'Ukraine' },
  { value: 'argentina', label: 'Argentina' },
  { value: 'australia', label: 'Australia' },
  { value: 'austria', label: 'Austria' },
  { value: 'belgium', label: 'Belgium' },
  { value: 'brazil', label: 'Brazil' },
  { value: 'canada', label: 'Canada' },
  { value: 'finland', label: 'Finland' },
  { value: 'hungary', label: 'Hungary' },
  { value: 'ireland', label: 'Ireland' },
  { value: 'italy', label: 'Italy' },
  { value: 'latvia', label: 'Latvia' },
  { value: 'poland', label: 'Poland' },
  { value: 'scotland', label: 'Scotland' },
  { value: 'sweden', label: 'Sweden' },
  { value: 'taiwan', label: 'Taiwan' },
  { value: 'united-arab-emirates', label: 'United Arab Emirates' },
  { value: 'germany', label: 'Germany' },
  { value: 'united-states-of-america', label: 'USA' },
] satisfies CountrySelectorOptions;

const Messenger = { TELEGRAM: 'TELEGRAM', WHATSAPP: 'WHATSAPP', FACEBOOK: 'FACEBOOK' } as const;
const options = [
  { value: Messenger.TELEGRAM, icon: 'telegram', iconSection: 'social-media' },
  {
    value: Messenger.WHATSAPP,
    icon: 'whatsapp',
    iconSection: 'social-media',
  },
  {
    value: Messenger.FACEBOOK,
    icon: 'facebook',
    iconSection: 'social-media',
  },
] satisfies RadioOptions;
