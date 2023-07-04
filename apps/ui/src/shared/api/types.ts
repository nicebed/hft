export interface PaginationParams {
  take: number;
  skip: number;
}

export type MetaData = {
  hasMore: boolean;
};

export type ApiError = {
  data: {
    message: string;
    statusCode: number;
  };
  status: number;
};
