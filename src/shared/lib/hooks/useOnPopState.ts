import { useEffect } from 'react';

export function useOnPopState(callback: () => void, pathname = '/') {
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === pathname) {
        callback();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [callback, pathname]);
}
