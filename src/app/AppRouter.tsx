import { Route, Routes } from 'react-router';

import { AboutPage, HomePage } from '@/pages';

export const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='about' element={<AboutPage />} />
    </Routes>
  );
};
