const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Cung cấp đường dẫn tới ứng dụng Next.js của bạn để tải các cấu hình next.config.js và .env
  dir: './',
});

// Cấu hình Jest tùy chỉnh
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
    '^@/features/(.*)$': '<rootDir>/src/features/$1',
    '^@/shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/store/(.*)$': '<rootDir>/src/store/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
  ],
};

// exportConfigType là một function mà nextJest() trả về
// Xuất configuration với các cấu hình Next.js được áp dụng
module.exports = createJestConfig(customJestConfig);