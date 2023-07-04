import { Provider as ReduxProvider } from 'react-redux';
import { appStore } from '../store';

export const withStore = (component: () => React.ReactNode) => () => {
  return <ReduxProvider store={appStore}>{component()}</ReduxProvider>;
};
