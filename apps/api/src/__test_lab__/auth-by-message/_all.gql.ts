
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface LoginInput {
    phone: number;
    communicationProvider: string;
}

export interface LoginRes {
    phone: number;
    simSim: string;
    communicationProvider: string;
}

export interface ISubscription {
    login(loginData?: Nullable<LoginInput>): LoginRes | Promise<LoginRes>;
}

export interface IQuery {
    get_null_if_test(): Nullable<string> | Promise<Nullable<string>>;
}

type Nullable<T> = T | null;
