export const _PROVIDER_TOKEN_FOR_TEST_CONFIG = 'TEST_CONFIG';

export const _TestConfig = {
  someMessenger: {
    host: 'localhost',
    port: 8000,
  },
  app: {
    host: 'localhost',
    port: 8001,
  },
} as const;
