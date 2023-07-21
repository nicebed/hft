import { ApolloQueryResult, TypedDocumentNode } from '@apollo/client/core/types';
import { SingleExecutionResult } from '@apollo/client/link/core/types';

export interface ApiService {
  query: Query;
  mutate: Mutate;
}

// -----------
export type QueryParams<P, R> = {
  query: GqlDocument;
} & BaseClientOperationParams<P, R>;

export type Query = <P extends BaseData, R extends ApiResponse>({
  query,
  variables,
  dataMapper,
}: QueryParams<P, R>) => Promise<ApolloQueryResult<R>>;

// -----------
export type MutateParams<P, R> = {
  mutation: GqlDocument;
  invalidate: GqlDocument[];
} & BaseClientOperationParams<P, R>;

export type Mutate = <P extends BaseData, R extends ApiResponse>({
  mutation,
  variables,
  dataMapper,
  invalidate,
}: MutateParams<P, R>) => Promise<SingleExecutionResult<R>>;

// -----------
export type BaseClientOperationParams<P, R> = {
  variables?: P;
  dataMapper?: (data: ApiResponse) => R;
};

export type BaseData = Record<string, unknown> | undefined;

export type ApiResponse = object;

type GqlDocument = TypedDocumentNode<Record<string, unknown>>;
