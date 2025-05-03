import './Layout.scss';

import { motion } from 'framer-motion';
import { FC, ReactNode } from 'react';
import { Outlet, useLocation } from 'react-router';

interface ILayoutProps {
  headerSlot?: ReactNode;
  footerSlot?: ReactNode;
}

export const Layout: FC<ILayoutProps> = ({ headerSlot, footerSlot }) => {
  const { pathname } = useLocation();

  return (
    <div className='layout'>
      {headerSlot}
      <motion.main
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Outlet />
      </motion.main>
      {footerSlot}
    </div>
  );
};
