import compose from 'compose-function';

import { withStore } from './with-store';
import { withApollo } from './with-apollo';

export const withProviders = compose(withStore, withApollo);
