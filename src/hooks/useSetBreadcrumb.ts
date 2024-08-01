import { useBreadcrumb } from '@/providers/breadcrumb-provider';
import { useEffect } from 'react';
interface UseSetBreadcrumbProps {
  breadcrumbPath?: string;
}

const useSetBreadcrumb = ({ breadcrumbPath = '/' }: UseSetBreadcrumbProps) => {
  const { setBreadcrumbPage, setBreadcrumbItems } = useBreadcrumb();
  useEffect(() => {
    const items = breadcrumbPath.split('/').filter((item) => item !== '');
    const lastItem = items.pop();
    setBreadcrumbPage(lastItem || '');
    setBreadcrumbItems(
      items.map((item) => ({
        name: item,
        link: `/${item.toLowerCase()}`,
      })),
    );
  }, [breadcrumbPath, setBreadcrumbItems, setBreadcrumbPage]);
};

export default useSetBreadcrumb;
