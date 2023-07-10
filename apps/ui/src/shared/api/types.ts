import { ApolloQueryResult, TypedDocumentNode } from '@apollo/client/core/types';
import { SingleExecutionResult } from '@apollo/client/link/core/types';

export interface ApiService {
  query: Query;
  mutate: Mutate;
}

// -----------
export type QueryParams<P, R> = {
  query: TypedDocumentNode<Record<string, unknown>>;
} & BaseClientOperationParams<P, R>;

export type Query = <P extends BaseData, R extends ApiResponse>({
  query,
  variables,
  dataMapper,
}: QueryParams<P, R>) => Promise<ApolloQueryResult<R>>;

// -----------
export type MutateParams<P, R> = {
  mutation: TypedDocumentNode<Record<string, unknown>>;
} & BaseClientOperationParams<P, R>;

export type Mutate = <P extends BaseData, R extends ApiResponse>({
  mutation,
  variables,
  dataMapper,
}: MutateParams<P, R>) => Promise<SingleExecutionResult<R>>;

// -----------
export type BaseClientOperationParams<P, R> = {
  variables?: P;
  dataMapper?: (data: ApiResponse) => R;
};

export type BaseData = Record<string, unknown> | undefined;

export type ApiResponse = object;
