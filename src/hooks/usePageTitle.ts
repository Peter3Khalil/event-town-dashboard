import { useEffect } from 'react';

const usePageTitle = (title: string) => {
  useEffect(() => {
    if (title.trim() !== '') {
      document.title = title + ' | Admin Dashboard';
    }
  }, [title]);
};

export default usePageTitle;
