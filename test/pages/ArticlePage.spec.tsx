import { h } from 'preact'
import { mount, shallow } from 'enzyme'

import ArticlePage from '../../src/pages/ArticlePage'
import { deleteComment, getArticle, getCommentsByArticle, postComment } from '../../src/services'
import {
  generateArticles,
  generateProfile,
  generateComments,
  getInputValue,
  setInputValue,
} from '../utils/test-utils'
import ArticleMeta from '../../src/components/ArticleMeta'
import ArticleCommentCard from '../../src/components/ArticleCommentCard'
import { useRootState } from '../../src/store'

jest.mock('../../src/services')
jest.mock('../../src/store')

const getArticleMock = getArticle as jest.Mock<Promise<Article>>;
const getCommentsByArticleMock = getCommentsByArticle as jest.Mock<Promise<ArticleComment[]>>;
const deleteCommentMock = deleteComment as jest.Mock;
const postCommentMock = postComment as jest.Mock<Promise<ArticleComment>>;
const useRootStateMock = useRootState as jest.Mock;

const loggedUser = generateProfile();

beforeEach(() => {
  getArticleMock.mockResolvedValue({ author: {} } as Article);
  getCommentsByArticleMock.mockResolvedValue([]);
  postCommentMock.mockResolvedValue({ author: {} } as ArticleComment);
  useRootStateMock.mockReturnValue([{ user: loggedUser }, jest.fn()]);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('# Article Page', () => {
  it('should request article when page loaded', async () => {
    const article = generateArticles();
    getArticleMock.mockResolvedValue(article);
    shallow(<ArticlePage slug={article.slug} />);

    expect(getArticle).toBeCalledTimes(1);
    expect(getArticle).toBeCalledWith(article.slug);
  });

  it('should display article info by state', async () => {
    const article = generateArticles();
    getArticleMock.mockResolvedValue(article);
    const wrapper = shallow(<ArticlePage slug={article.slug} />);
    await new Promise((r) => setImmediate(r));

    expect(wrapper.find(ArticleMeta)).toHaveLength(2);
    expect(wrapper.find(ArticleMeta).at(0).props().article).toMatchObject(article);
  });

  it('should request comments when page loaded', async () => {
    shallow(<ArticlePage slug="slug" />);
    await new Promise((r) => setImmediate(r));

    expect(getCommentsByArticle).toBeCalledTimes(1);
    expect(getCommentsByArticle).toBeCalledWith('slug');
  });

  it('should display comments', async () => {
    const articleComments = generateComments(2);
    getCommentsByArticleMock.mockResolvedValue(articleComments);
    const wrapper = shallow(<ArticlePage slug="slug" />);
    await new Promise((r) => setImmediate(r));

    expect(wrapper.find(ArticleCommentCard)).toHaveLength(2);
    expect(wrapper.find(ArticleCommentCard).at(0).props().comment).toBe(articleComments[0]);
  });

  it('should request delete comment and remove from list when delete comment triggered', async () => {
    deleteCommentMock.mockResolvedValue({});
    const comment = generateComments();
    getCommentsByArticleMock.mockResolvedValue([comment]);
    const wrapper = shallow(<ArticlePage slug="slug" />);
    await new Promise((r) => setImmediate(r));
    const commentWrap = wrapper.find(ArticleCommentCard);

    commentWrap.props().onDelete(comment.id);
    await new Promise((r) => setImmediate(r));
    wrapper.update();

    expect(deleteComment).toBeCalledTimes(1);
    expect(deleteComment).toBeCalledWith('slug', comment.id);
    expect(wrapper.find(ArticleCommentCard)).toHaveLength(0);
  });

  it('should display logged user image', () => {
    const wrapper = shallow(<ArticlePage slug="slug" />);

    expect(wrapper.find('.comment-author-img').props().src).toBe(loggedUser.image);
  });

  it('should can post comment', async () => {
    const comment = generateComments();
    postCommentMock.mockResolvedValue(comment);
    const wrapper = mount(<ArticlePage slug="slug" />);
    await new Promise((r) => setTimeout(r));

    setInputValue(wrapper, '.comment-form textarea', 'test');
    wrapper.find('.comment-form button').simulate('click');
    await new Promise((r) => setTimeout(r));
    wrapper.update();

    expect(postComment).toBeCalledTimes(1);
    expect(postComment).toBeCalledWith('slug', 'test');
    expect(getInputValue(wrapper, '.comment-form textarea')).toBe('');
    expect(wrapper.find(ArticleCommentCard).props().comment).toMatchObject(comment);
  });
});
