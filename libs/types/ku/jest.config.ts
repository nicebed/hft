import type { Config } from 'jest';

const config: Config = {
  displayName: 'types-ku',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  detectLeaks: true,
  detectOpenHandles: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};

export default config;
