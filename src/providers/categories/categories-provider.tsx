import createDataContext from '@/providers/data-provider';
import CategoriesApi from '@/services/CategoriesApi';
import { Category } from '@/types/categories.types';

const { ContextProvider: CategoriesProvider, useDataProvider: useCategories } =
  createDataContext<Category>({
    ApiClass: CategoriesApi,
    queryKey: 'categories',
  });

export { CategoriesProvider, useCategories };
