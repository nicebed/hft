export type AppStore = ReturnType<typeof import('./index').makeStore>;

export type AppDispatch = AppStore['dispatch'];
