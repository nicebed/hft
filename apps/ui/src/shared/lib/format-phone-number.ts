import { PHONE_NUMBER_FORMATS } from '../config/phone-number-formats';
import { Country, PhoneNumber } from '../types';
import { removeCharAt } from './remove-char-at';
import { replaceCharAt } from './replace-char-at';

const BINDING_SYMBOL = '-';
const SPACE = ' ';

interface Params {
  value: PhoneNumber | null | undefined;
  country: Country;
}

export const formatPhoneNumber = ({ value, country }: Params) => {
  if (!value) return '';

  const template = PHONE_NUMBER_FORMATS[country];
  const cleanedInput = ('' + value).replace(/\D/g, '');

  let output = template;

  let originValueIndex = 0;
  for (let i = 0; i < output.length; ++i) {
    if (output.charAt(i) === BINDING_SYMBOL || output.charAt(i) === SPACE) continue;

    output = replaceCharAt({
      string: output,
      index: i,
      replacement: cleanedInput.charAt(originValueIndex),
    });
    ++originValueIndex;
  }

  for (let i = 0; i < output.length; ++i) {
    if (output.charAt(i) !== 'A') continue;

    const prev = i - 1;
    const next = i;

    if (output.charAt(prev) === BINDING_SYMBOL || output.charAt(prev) === SPACE) {
      output = removeCharAt({
        string: output,
        index: prev,
      });
      --i;
    }

    output = removeCharAt({
      string: output,
      index: i,
    });

    if (output.charAt(next) === BINDING_SYMBOL || output.charAt(next) === SPACE) {
      output = removeCharAt({
        string: output,
        index: next,
      });
      --i;
    }

    --i;
  }

  return output;
};
