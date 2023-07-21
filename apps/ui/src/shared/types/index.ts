export const Role = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  CLIENT: 'CLIENT',
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export type IconName = string;

export type Country =
  | 'united-kingdom'
  | 'ukraine'
  | 'france'
  | 'argentina'
  | 'australia'
  | 'austria'
  | 'belgium'
  | 'brazil'
  | 'canada'
  | 'finland'
  | 'hungary'
  | 'ireland'
  | 'italy'
  | 'latvia'
  | 'poland'
  | 'scotland'
  | 'sweden'
  | 'taiwan'
  | 'united-arab-emirates'
  | 'germany'
  | 'united-states-of-america';

export type PhoneNumber = string;
