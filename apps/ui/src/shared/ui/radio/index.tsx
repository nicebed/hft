import { IconName } from '@app/shared/types';
import clsx from 'clsx';
import { useState } from 'react';
import { Icon } from '../icon';
import { OptionValue, Props, RadioOptions } from './types';
import { Button as AntdBUtton } from 'antd';

export const Radio = <O extends RadioOptions>({
  options,
  onChange,
  defaultChecked,
  className,
}: Props<O>) => {
  const [selected, setSelected] = useState<OptionValue | undefined>(defaultChecked);

  const handleOptionClick = (value: string) => {
    console.log(value);
    setSelected(value);
    onChange(value);
  };

  const optionsList = options.map((item) => (
    <Button
      value={item.value}
      icon={item.icon}
      selected={selected === item.value}
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
  selected,
  onClick,
}: {
  value: string;
  icon: IconName;
  selected: boolean;
  onClick: (value: string) => void;
}) => {
  console.log(selected);
  return (
    <AntdBUtton
      className={clsx(
        'bg-gray-100/20 flex items-center justify-center p-4 w-10 h-10',
        selected && 'bg-blue-100'
      )}
      // type='text'
      onClick={() => onClick(value)}
    >
      {/* <Icon
        name={icon}
        className='w-8 h-8 bg-transparent'
      /> */}
    </AntdBUtton>
  );
};
