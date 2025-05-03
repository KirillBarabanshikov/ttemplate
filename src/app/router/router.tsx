import { createBrowserRouter } from 'react-router';

import { AboutPage, HomePage } from '@/pages';

import { baseLayout } from '../layouts';

export const router = createBrowserRouter([
  {
    element: baseLayout,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
    ],
  },
]);
