import { withGuard } from './with-guard';

import Home from '@app/pages/home';
import Settings from '@app/pages/settings';

export const ProtectedPages = {
  Home: withGuard(Home, ['USER']),
  Settings: withGuard(Settings, ['CLIENT']),
};
