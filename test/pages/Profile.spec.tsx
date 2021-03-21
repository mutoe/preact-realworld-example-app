import { h } from 'preact'
import { shallow } from 'enzyme'

import { generateArticles, generateProfile } from '../utils/test-utils'
import Profile from '../../src/pages/Profile'
import { deleteFollowProfile, getArticles, getProfile, getProfileArticles, postFollowProfile } from '../../src/services'
import ArticlePreview from '../../src/components/ArticlePreview'
import { useRootState } from '../../src/store'

jest.mock('../../src/services')
jest.mock('../../src/store')

const getProfileMock = getProfile as jest.Mock<Promise<Profile>>
const getArticlesMock = getArticles as jest.Mock<Promise<ArticlesResponse>>
const getProfileArticlesMock = getProfileArticles as jest.Mock<Promise<ArticlesResponse>>
const useRootStateMock = useRootState as jest.Mock

const loggedUser = generateProfile()

beforeEach(() => {
  getProfileMock.mockResolvedValue({} as Profile);
  getArticlesMock.mockResolvedValue({ articles: [], articlesCount: 0 });
  getProfileArticlesMock.mockResolvedValue({ articles: [], articlesCount: 0 });
  useRootStateMock.mockReturnValue([{}, jest.fn()]);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('# Profile Page', () => {
  it('should display correct username', () => {
    const author = generateProfile();
    const wrapper = shallow(<Profile username={`@${author.username}`} />);

    expect(wrapper.find('.user-info h4').text()).toBe(author.username);
    expect(wrapper.find('.user-info button').text()).toContain(`Follow ${author.username}`);
  });

  it('should be request profile when page loaded', async () => {
    const author = generateProfile();
    shallow(<Profile username={`@${author.username}`} />);
    await new Promise((r) => setImmediate(r));

    expect(getProfile).toBeCalledTimes(1);
    expect(getProfile).toBeCalledWith(author.username);
  });

  it('should display user profile correctly', async () => {
    const author = generateProfile();
    getProfileMock.mockResolvedValue(author);

    const wrapper = shallow(<Profile username={`@${author.username}`} />);
    await new Promise((r) => setImmediate(r));
    wrapper.update();

    expect(wrapper.find('.user-info p').text()).toBe(author.bio);
    expect(wrapper.find('.user-info .user-img').prop('src')).toBe(author.image);
  });

  it('should request articles that about profile', () => {
    shallow(<Profile username="foo" />);

    expect(getProfileArticles).toBeCalledTimes(1);
    expect(getProfileArticles).toBeCalledWith('foo', 1);
  });

  it('should display article preview after articles got', async () => {
    const articles = generateArticles(2);
    getProfileArticlesMock.mockResolvedValue({ articles, articlesCount: 2 });
    const wrapper = shallow(<Profile username="@foo" />);
    await new Promise((r) => setImmediate(r));

    expect(wrapper.find(ArticlePreview)).toHaveLength(2);
  });
});

describe('# Follow user', () => {
  it('should display Follow when user is not following', async () => {
    const user = generateProfile();
    user.following = false;
    getProfileMock.mockResolvedValue(user);
    const wrapper = shallow(<Profile username={`@${user.username}`} />);
    await new Promise((r) => setImmediate(r));
    wrapper.update();

    expect(wrapper.find('.user-info button').text()).toContain('Follow');
  });

  it('should display Unfollow when user is following', async () => {
    const user = generateProfile();
    user.following = true;
    getProfileMock.mockResolvedValue(user);
    const wrapper = shallow(<Profile username={`@${user.username}`} />);
    await new Promise((r) => setImmediate(r));
    wrapper.update();

    expect(wrapper.find('.user-info button').text()).toContain('Unfollow');
  });

  it('should send follow request when Follow button clicked', async () => {
    const user = generateProfile();
    getProfileMock.mockResolvedValue({ ...user, following: false });
    const wrapper = shallow(<Profile username={`@${user.username}`} />);
    await new Promise((r) => setImmediate(r));

    const postFollowProfileMock = postFollowProfile as jest.Mock<Promise<Profile>>;
    postFollowProfileMock.mockImplementation();
    wrapper.find('.user-info button').simulate('click');

    expect(postFollowProfileMock).toBeCalledTimes(1);
  });

  it('should send unfollow request when Unfollow button clicked', async () => {
    const user = generateProfile();
    getProfileMock.mockResolvedValue({ ...user, following: true });
    const wrapper = shallow(<Profile username={`@${user.username}`} />);
    await new Promise((r) => setImmediate(r));

    const deleteFollowProfileMock = deleteFollowProfile as jest.Mock<Promise<Profile>>;
    deleteFollowProfileMock.mockImplementation();
    wrapper.find('.user-info button').simulate('click');

    expect(deleteFollowProfileMock).toBeCalledTimes(1);
  });

  it('should display edit profile instead follow in owner self profile page', async () => {
    getProfileMock.mockResolvedValue(loggedUser);
    useRootStateMock.mockReturnValue([{ user: loggedUser }, jest.fn()]);
    const wrapper = shallow(<Profile username="@username" />);
    await new Promise((r) => setImmediate(r));
    wrapper.update();

    expect(wrapper.find('.user-info .action-btn').props().href).toBe('/settings');
  });
});
