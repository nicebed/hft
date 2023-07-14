import { Radio } from '@app/shared/ui/radio';
import { RadioOptions } from '@app/shared/ui/radio/types';

const Messenger = { TELEGRAM: 'TELEGRAM', WHATSAPP: 'WHATSAPP', NU: 0 } as const;
const options = [
  { value: Messenger.TELEGRAM, icon: 'telegram' },
  {
    value: Messenger.WHATSAPP,
    icon: 'whatsapp',
  },
] satisfies RadioOptions;

export default function SignIn() {
  const handleNone = () => 0;

  return (
    <main className='flex flex-col w-full items-center pt-12 space-y-2'>
      <Radio
        options={options}
        // defaultChecked='TELEGRAM'
        onChange={handleNone}
      />
    </main>
  );
}
