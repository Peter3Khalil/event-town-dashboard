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
