'use client';
import { DEFAULT_QUERY_PARAMS } from '@/constants';
import useCustomQuery, { UseCustomQueryResult } from '@/hooks/useCustomQuery';
import useDebounceEffect from '@/hooks/useDebounceEffect';
import OrganizersApi from '@/services/OrganizersApi';
import { GetAllQueryParams } from '@/types/global.types';
import { GetAllOrganizersResponse } from '@/types/organizer.types';
import { AxiosResponse } from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

type ContextType<TData> = {
  queryResult: UseCustomQueryResult<TData, unknown>;
  setParams: React.Dispatch<React.SetStateAction<GetAllQueryParams>>;
  params: GetAllQueryParams;
};
const OrganizersContext = createContext<
  ContextType<AxiosResponse<GetAllOrganizersResponse>>
>({
  queryResult: {} as UseCustomQueryResult<
    AxiosResponse<GetAllOrganizersResponse>,
    unknown
  >,
  setParams: () => {},
  params: DEFAULT_QUERY_PARAMS,
});

const OrganizersProvider = ({ children }: { children: React.ReactNode }) => {
  const [params, setParams] = useState<GetAllQueryParams>(DEFAULT_QUERY_PARAMS);
  const [debounceParams, setDebounceParams] =
    useState<GetAllQueryParams>(DEFAULT_QUERY_PARAMS);
  const queryResult = useCustomQuery(
    ['organizers', debounceParams],
    ({ signal }) => OrganizersApi.getAll(debounceParams, { signal }),
  );

  useDebounceEffect(params, 500, setDebounceParams);
  useEffect(() => {
    setParams((prev) => ({ ...prev, page: 1 }));
  }, [params.limit]);
  //TODO: Set search params to query params on route change
  return (
    <OrganizersContext.Provider
      value={{
        queryResult,
        setParams,
        params: debounceParams,
      }}
    >
      {children}
    </OrganizersContext.Provider>
  );
};

const useOrganizers = () => {
  const context = useContext(OrganizersContext);

  if (context === undefined) {
    throw new Error('useOrganizers must be used within a OrganizersProvider');
  }

  return context;
};

export { OrganizersProvider, useOrganizers };
