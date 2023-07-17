import { ISubscription } from './_all.gql';

export type _UserKeys = Awaited<ReturnType<ISubscription['login']>>;
