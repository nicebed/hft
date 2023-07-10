import { FunctionComponent } from 'react';
import { Navigate } from 'react-router-dom';
import { Role } from '@app/shared/types';

const SUPER_ROLES = ['ADMIN'] satisfies Role[];

export function withGuard(
  Component: FunctionComponent,
  permissibleRoles: ExcludeStrict<Role, (typeof SUPER_ROLES)[number]>[],
  redirectTo?: RoutePath
) {
  return function RouteElement(props: Record<string, unknown>) {
    const sessionRole = 'USER'; // TODO: replace role from authModel

    if (!isAccessGranted(sessionRole, permissibleRoles)) {
      return (
        <Navigate
          to={redirectTo || '/access-denied'}
          replace
        />
      );
    }

    return <Component {...props} />;
  };
}

const isAccessGranted = (
  sessionRole: Role,
  permissibleRoles: ExcludeStrict<Role, (typeof SUPER_ROLES)[number]>[]
) => {
  const allPermissibleRoles = [...SUPER_ROLES, ...permissibleRoles];
  return allPermissibleRoles.some((role) => role === sessionRole);
};
