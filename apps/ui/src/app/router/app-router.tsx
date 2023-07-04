import { BaseLayout } from '@app/app/layouts/base-layout';
import { createBrowserRouter } from 'react-router-dom';

import { ProtectedPages } from './guard-config';
import AccessDenied from '@app/pages/access-denied';

export const appRouter = () =>
  createBrowserRouter([
    {
      element: BaseLayout,
      children: [
        {
          path: '/',
          element: <ProtectedPages.Home />,
        },
        {
          path: '/settings',
          element: <ProtectedPages.Settings />,
        },
        {
          path: '/access-denied',
          element: <AccessDenied />,
        },
      ],
    },
  ]);
