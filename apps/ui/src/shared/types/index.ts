export const Role = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  CLIENT: 'CLIENT',
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export type IconName = string;
