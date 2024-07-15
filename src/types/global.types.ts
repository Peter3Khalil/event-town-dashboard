export type PaginationResult = {
  currentPage: number;
  limit: number;
  numberOfPages: number;
};
export type GetAllQueryParams = {
  page: number;
  limit: number;
  keyword?: string;
};

export type GetAllResponse<T> = {
  results: number;
  totlaCount: number;
  paginationResult: PaginationResult;
  data: T[];
};

export type ErrorResponse = {
  errors: Error[];
};

export type Error = {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
};
