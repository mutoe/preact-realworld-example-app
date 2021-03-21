import { h } from 'preact'
import render from 'preact-render-to-string'

import Header from '../../src/components/Header'
import { useRootState } from '../../src/store'

jest.mock('../../src/store')

const useRootStateMock = useRootState as jest.Mock;

beforeEach(() => {
  useRootStateMock.mockReturnValue([{ user: null }]);
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('# Header Component', () => {
  it('should hidden post and settings and display logging buttons when not logged', () => {
    useRootStateMock.mockReturnValue([{ user: null }]);
    const html = render(<Header />);

    expect(html).toContain('Sign in');
  });

  it('should display post and settings and hidden logging buttons when logged', () => {
    useRootStateMock.mockReturnValue([{ user: {} }]);
    const html = render(<Header />);

    expect(html).toContain('New Post');
  });

  it('should display username after user logged', () => {
    useRootStateMock.mockReturnValue([{ user: { username: 'foo' } }]);
    const html = render(<Header />);

    expect(html).toContain('foo');
  });
});
