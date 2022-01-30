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
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
  },
};

export default config;
