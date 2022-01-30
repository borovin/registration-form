import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { server } from 'test-utils';
import { clear as clearStore } from 'test-utils/store';

window.history.pushState = jest.fn();
jest.mock('utils/dbConnect');

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  clearStore();
  jest.restoreAllMocks();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
