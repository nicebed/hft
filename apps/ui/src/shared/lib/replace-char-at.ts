interface Params {
  string: string;
  index: number;
  replacement: string;
}

export const replaceCharAt = ({ string, index, replacement }: Params) => {
  return string.substring(0, index) + replacement + string.substring(index + replacement.length);
};
