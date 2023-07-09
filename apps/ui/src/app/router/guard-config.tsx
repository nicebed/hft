import AccessDenied from '@app/pages/access-denied';
// import { withGuard } from './with-guard';

import Home from '@app/pages/home';
import SignIn from '@app/pages/auth/sign-in';
import News from '@app/pages/news';

export const Pages = {
  Home,
  News,

  // Auth
  SignIn,
  AccessDenied,
};
