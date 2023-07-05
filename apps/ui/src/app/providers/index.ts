import compose from 'compose-function';

import { withStore } from './with-store';
import { withDateLocalization } from './with-localization';
import { withApollo } from './with-apollo';

export const withProviders = compose(withStore, withApollo, withDateLocalization);
