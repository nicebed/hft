import { IconName } from '@app/shared/types';
import clsx from 'clsx';
import { useState } from 'react';
import { Icon } from '../icon';
import { OptionValue, Props, RadioOptions } from './types';

export const Radio = <O extends RadioOptions>({
  options,
  onChange,
  defaultChecked,
  className,
}: Props<O>) => {
  const [selected, setSelected] = useState<OptionValue>(defaultChecked);

  const handleOptionClick = (value: string) => {
    console.log(value);
    setSelected(value);
    onChange(value);
  };

  const optionsList = options.map((item) => (
    <Button
      value={item.value}
      icon={item.icon}
      onClick={handleOptionClick}
    />
  ));

  return (
    <main className={clsx('w-full flex flex-row items-center justify-center flex-wrap', className)}>
      {optionsList}
    </main>
  );
};

const Button = ({
  value,
  icon,
  onClick,
}: {
  value: string;
  icon: IconName;
  onClick: (value: string) => void;
}) => {
  return (
    <button onClick={() => onClick(value)}>
      <Icon
        name={icon}
        className='w-5 h-5'
      />
    </button>
  );
};
