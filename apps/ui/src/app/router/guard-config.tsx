import AccessDenied from '@app/pages/access-denied';
import { withGuard } from './with-guard';

import Home from '@app/pages/home';
import Settings from '@app/pages/settings';
import Signup from '@app/pages/auth/sign-up';

export const Pages = {
  Home: withGuard(Home, ['USER']),
  Settings: withGuard(Settings, ['CLIENT']),

  // Auth
  Signup,
  AccessDenied,
};
