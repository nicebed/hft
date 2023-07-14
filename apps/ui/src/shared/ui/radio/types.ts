import { IconName } from '@app/shared/types';

export interface Props<O extends RadioOptions> {
  options: O;
  onChange: (value: OptionValue) => void;
  defaultChecked?: AvailableOptions<O>;
  className?: string;
}

export type RadioOptions = Array<OptionObject>;

type OptionObject = { value: OptionValue; icon: IconName };

export type OptionValue = string;

type AvailableOptions<T> = T extends { value: infer V; icon: IconName }[] ? V : never;
