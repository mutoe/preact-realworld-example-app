<<<<<<< HEAD:test/components/PopularTags.spec.tsx
import { h } from 'preact'
import { shallow } from 'enzyme'

import PopularTags from '../../src/components/PopularTags'
import { getAllTags } from '../../src/services'

jest.mock('../../src/services')
=======
import PopularTags from '../PopularTags';
import { shallow } from 'enzyme';
import { h } from 'preact';
import { getAllTags } from '../../services';

jest.mock('../../services');
>>>>>>> 2b7be12 (style: Switching to Preact code style):src/components/__test__/PopularTags.spec.tsx

const getAllTagsMock = getAllTags as jest.Mock<Promise<string[]>>;

beforeEach(() => {
  getAllTagsMock.mockResolvedValue([]);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('# Popular Tags Component', () => {
  it('should display title', () => {
    const wrapper = shallow(<PopularTags />);

    expect(wrapper.text()).toContain('Popular Tags');
  });

  it('should request all tags when component did mounted', () => {
    shallow(<PopularTags />);

    expect(getAllTags).toBeCalledTimes(1);
  });
});
