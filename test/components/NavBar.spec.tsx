import { h } from 'preact'
import render from 'preact-render-to-string'
import { shallow } from 'enzyme'

import NavBar from '../../src/components/NavBar'
import { useRootState } from '../../src/store'

jest.mock('../../src/store')

const useRootStateMock = useRootState as jest.Mock;

beforeEach(() => {
  useRootStateMock.mockReturnValue([{ user: null }]);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('# Navigation Bar Component', () => {
  it('should display "Global Feed" item always', () => {
    const wrapper = shallow(<NavBar />);

    expect(wrapper.text()).toContain('Global Feed');
  });

  it('should jump to Home page when "Global Feed" clicked', () => {
    const wrapper = shallow(<NavBar />);
    const globalFeedLink = wrapper.findWhere((n) => n.type() === 'a' && n.text() === 'Global Feed');

    expect(globalFeedLink.props().href).toBe('/');
  });

  it('should jump to My Feed page when "Your Feed" clicked', () => {
    useRootStateMock.mockReturnValue([{ user: { username: 'foo' } }]);
    const wrapper = shallow(<NavBar />);
    const myFeedLink = wrapper.findWhere((n) => n.type() === 'a' && n.text() === 'Your Feed');

    expect(myFeedLink.props().href).toBe('/my-feeds');
  });

  it('should be highlighted when the label is activated', () => {
    const wrapper = shallow(<NavBar currentActive="global" />);
    const globalFeedLink = wrapper.findWhere((n) => n.type() === 'a' && n.text() === 'Global Feed');

    expect(globalFeedLink.hasClass('active')).toBe(true);
  });

  it('should not be highlighted when label is inactivated', () => {
    const wrapper = shallow(<NavBar currentActive="personal" />);
    const globalFeedLink = wrapper.findWhere((n) => n.type() === 'a' && n.text() === 'Global Feed');

    expect(globalFeedLink.hasClass('active')).toBe(false);
  });

  it('should hide "Your Feed" link when not logging', () => {
    const html = render(<NavBar />);
    expect(html).not.toContain('Your Feed');
  });

  it('should display "Your Feed" link when logged', () => {
    useRootStateMock.mockReturnValue([{ user: {} }]);

    const html = render(<NavBar />);
    expect(html).toContain('Your Feed');
  });

  it('should highlight global feed and not highlight personal label in home page and user logged', () => {
    useRootStateMock.mockReturnValue([{ user: {} }]);
    const wrapper = shallow(<NavBar currentActive="global" />);

    const globalFeedLink = wrapper.findWhere((n) => n.type() === 'a' && n.text() === 'Global Feed');
    const personalFeedLink = wrapper.findWhere((n) => n.type() === 'a' && n.text() === 'Your Feed');

    expect(globalFeedLink.hasClass('active')).toBe(true);
    expect(personalFeedLink.hasClass('active')).toBe(false);
  });
});
