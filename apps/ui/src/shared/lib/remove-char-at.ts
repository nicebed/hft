interface Params {
  string: string;
  index: number;
}

export const removeCharAt = ({ index, string }: Params) => {
  return string.substring(0, index) + string.substring(index + 1);
};
