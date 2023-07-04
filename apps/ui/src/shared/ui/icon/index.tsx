import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<SVGSVGElement>, SVGSVGElement> {
  name: string;
  section?: string;
}

export const Icon = (props: Props) => {
  const { name, section = 'icons', ...other } = props;

  return (
    <svg
      {...other}
      data-testid='icon_svg'
    >
      <use
        data-testid='icon_svg_use'
        xlinkHref={`/icons/${section}.svg#${name.toLocaleLowerCase()}`}
      />
    </svg>
  );
};
