import { BaseLayout } from '@app/app/layouts/base-layout';
import { createBrowserRouter } from 'react-router-dom';

import { Pages } from './guard-config';

export const appRouter = () =>
  createBrowserRouter([
    {
      element: BaseLayout,
      children: [
        {
          path: '/auth/sign-up',
          element: <Pages.Signup />,
        },
        {
          path: '/',
          element: <Pages.Home />,
        },
        {
          path: '/settings',
          element: <Pages.Settings />,
        },
        {
          path: '/access-denied',
          element: <Pages.AccessDenied />,
        },
      ],
    },
  ]);
