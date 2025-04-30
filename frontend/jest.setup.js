// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock cho next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    pathname: '/',
    query: {},
  }),
}));

// Mock cho next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Thiết lập mặc định cho các tính năng toàn cục của trình duyệt
global.matchMedia = global.matchMedia || function() {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Giả lập Local Storage
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

Object.defineProperty(window, 'localStorage', {
  value: new LocalStorageMock(),
});

// Hàm để bỏ qua các lỗi console không cần thiết trong khi testing
const originalConsoleError = console.error;
console.error = (...args) => {
  // Chặn các cảnh báo về act() trong React Testing Library
  if (
    args[0] &&
    typeof args[0] === 'string' &&
    args[0].includes('Warning: An update to') &&
    args[0].includes('inside a test was not wrapped in act')
  ) {
    return;
  }
  originalConsoleError(...args);
};