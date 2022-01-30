import nextJest from 'next/jest';

const createJestConfig = nextJest({ dir: process.cwd() });

const config = {
  moduleDirectories: ['node_modules', '<rootDir>'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    './jest.setup.ts',
  ],
  coverageReporters: [
    'html',
    'cobertura',
  ],
  collectCoverageFrom: [
    'pages/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'utils/**/*.{ts,tsx}',
  ],
};

export default createJestConfig(config);
