import { CategoriesProvider } from '@/providers/categories/categories-provider';

const withCategoriesProvider = <P extends object>(
  Component: React.ComponentType<P>,
) => {
  const WithCategoriesProvider = (props: P) => {
    return (
      <CategoriesProvider>
        <Component {...props} />
      </CategoriesProvider>
    );
  };

  return WithCategoriesProvider;
};

export default withCategoriesProvider;
