import compose from 'compose-function';

import { withStore } from './with-store';
import { withDateLocalization } from './with-localization';

export const withProviders = compose(withStore, withDateLocalization);
