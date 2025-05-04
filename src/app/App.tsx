import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router';

import { queryClient } from '@/shared/api';
import { VirtualKeyboardProvider } from '@/shared/lib/VirtualKeyboard';

import { router } from './router';

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <VirtualKeyboardProvider>
        <RouterProvider router={router} />
      </VirtualKeyboardProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
