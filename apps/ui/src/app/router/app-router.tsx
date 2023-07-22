import { createBrowserRouter } from 'react-router-dom';
import { Pages } from './pages-config';
import Layout from '@app/shared/ui/layout';

export const appRouter = () =>
  createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Pages.Home />,
        },
        {
          path: '/news',
          element: <Pages.News />,
        },

        // AUTH
        {
          path: '/auth/sign-in',
          element: <Pages.SignIn />,
        },
        {
          path: '/access-denied',
          element: <Pages.AccessDenied />,
        },
      ],
    },
  ]);
