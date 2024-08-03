import { DEFAULT_QUERY_PARAMS } from '@/constants';
import useCustomQuery, { UseCustomQueryResult } from '@/hooks/useCustomQuery';
import useDebounceEffect from '@/hooks/useDebounceEffect';
import { APIInterface } from '@/services/APIInterface';
import { GetAllQueryParams, GetAllResponse } from '@/types/global.types';
import { AxiosResponse } from 'axios';
import React, {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from 'react';
import { QueryKey } from 'react-query';

type ContextType<TData, ParamsType extends GetAllQueryParams> = {
  queryResult: UseCustomQueryResult<
    AxiosResponse<GetAllResponse<TData>>,
    unknown
  >;
  setParams: Dispatch<React.SetStateAction<ParamsType>>;
  params: ParamsType;
};

const createDataContext = <
  TData,
  ParamsType extends GetAllQueryParams = GetAllQueryParams,
  APIType extends APIInterface<TData, ParamsType> = APIInterface<
    TData,
    ParamsType
  >,
>({
  ApiClass,
  queryKey,
}: {
  ApiClass: APIType;
  queryKey: QueryKey;
}) => {
  const Context = createContext<ContextType<TData, ParamsType>>({
    queryResult: {} as UseCustomQueryResult<
      AxiosResponse<GetAllResponse<TData>>,
      unknown
    >,
    setParams: () => {},
    params: DEFAULT_QUERY_PARAMS as ParamsType,
  });

  const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [params, setParams] = useState<ParamsType>(
      DEFAULT_QUERY_PARAMS as ParamsType,
    );
    const [debounceParams, setDebounceParams] = useState<ParamsType>(
      DEFAULT_QUERY_PARAMS as ParamsType,
    );

    const queryResult = useCustomQuery(
      [queryKey, debounceParams],
      ({ signal }) => ApiClass.getAll(debounceParams, { signal }),
    );

    useDebounceEffect(params, 500, setDebounceParams);
    useEffect(() => {
      setParams((prev) => ({ ...prev, page: 1 }));
    }, [params.limit]);

    return (
      <Context.Provider
        value={{
          params,
          queryResult,
          setParams,
        }}
      >
        {children}
      </Context.Provider>
    );
  };

  const useDataProvider = () => {
    const context = useContext(Context);

    if (!context) {
      throw new Error('useDataProvider must be used within a ContextProvider');
    }

    return context;
  };

  return { ContextProvider, useDataProvider };
};

export default createDataContext;
