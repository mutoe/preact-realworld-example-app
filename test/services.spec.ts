<<<<<<< HEAD:test/services.spec.ts
import FetchRequest from '../src/utils/request'
=======
import FetchRequest from '../utils/request';
>>>>>>> 2b7be12 (style: Switching to Preact code style):src/__test__/services.spec.ts
import {
  limit,
  deleteComment,
  deleteFavoriteArticle,
  getArticles,
  getCommentsByArticle,
  getFavoritedArticles,
  getProfileArticles,
  postArticle,
  postFavoriteArticle,
  postLogin,
  postRegister,
<<<<<<< HEAD:test/services.spec.ts
} from '../src/services'
import { generateArticles, generateComments } from './utils/test-utils'
=======
} from '../services';
import { generateArticles, generateComments } from '../utils/test-utils';
>>>>>>> 2b7be12 (style: Switching to Preact code style):src/__test__/services.spec.ts

afterEach(() => {
  jest.clearAllMocks();
});

describe('# Service', () => {
  test('login', async () => {
    const form = {
      email: 'test@example.com',
      password: '12345678',
    };
    jest.spyOn(FetchRequest.prototype, 'post').mockResolvedValue({ user: form });
    const user = await postLogin(form);

    expect(user).toMatchObject(form);
  });

  test('register', async () => {
    const form = {
      email: 'test@example.com',
      password: '12345678',
      username: 'test',
    };
    jest.spyOn(FetchRequest.prototype, 'post').mockResolvedValue({ user: form });
    const user = await postRegister(form);

    expect(user).toMatchObject(form);
  });

  test('create article', async () => {
    const form = {
      title: 'title',
      description: 'description',
      body: 'body',
      tagList: ['dragons', 'training'],
    };
    jest.spyOn(FetchRequest.prototype, 'post').mockResolvedValue({ article: form });
    const article = await postArticle(form);

    expect(article).toMatchObject(form);
  });

  test('get article', async () => {
    const articles = generateArticles(2);
    jest.spyOn(FetchRequest.prototype, 'get').mockResolvedValue({ articles, articlesCount: 2 });
    const result = await getArticles();

    expect(FetchRequest.prototype.get).toBeCalledTimes(1);
    expect(FetchRequest.prototype.get).toBeCalledWith('/articles', {
      params: { offset: 0, limit },
    });
    expect(result).toHaveProperty('articles');
    expect(result).toHaveProperty('articlesCount');
  });

  test('get profile articles', async () => {
    const articles = generateArticles(2);
    jest.spyOn(FetchRequest.prototype, 'get').mockResolvedValue({ articles, articlesCount: 2 });
    const response = await getProfileArticles('foo');

    expect(FetchRequest.prototype.get).toBeCalledTimes(1);
    expect(FetchRequest.prototype.get).toBeCalledWith('/articles', {
      params: { offset: 0, limit, author: 'foo' },
    });
    expect(response).toHaveProperty('articles');
    expect(response).toHaveProperty('articlesCount');
  });

  test('get favorited articles by username', async () => {
    const articles = generateArticles(2);
    jest.spyOn(FetchRequest.prototype, 'get').mockResolvedValue({ articles, articlesCount: 2 });
    const response = await getFavoritedArticles('foo');

    expect(FetchRequest.prototype.get).toBeCalledTimes(1);
    expect(FetchRequest.prototype.get).toBeCalledWith('/articles', {
      params: { limit, offset: 0, favorited: 'foo' },
    });
    expect(response).toHaveProperty('articles');
    expect(response).toHaveProperty('articlesCount');
  });

  test('get comments by article', async () => {
    const comments = generateComments(2);
    jest.spyOn(FetchRequest.prototype, 'get').mockResolvedValue({ comments });
    const result = await getCommentsByArticle('slug');

    expect(FetchRequest.prototype.get).toBeCalledWith('/articles/slug/comments');
    expect(result).toHaveLength(2);
  });

  test('delete comments', async () => {
    jest.spyOn(FetchRequest.prototype, 'delete').mockResolvedValue({});
    await deleteComment('slug', 1);

    expect(FetchRequest.prototype.delete).toBeCalledWith('/articles/slug/comments/1');
  });

  test('post favorite article', async () => {
    jest.spyOn(FetchRequest.prototype, 'post').mockResolvedValue({});
    postFavoriteArticle('slug');

    expect(FetchRequest.prototype.post).toBeCalledWith('/articles/slug/favorite');
  });

  test('delete favorite article', () => {
    jest.spyOn(FetchRequest.prototype, 'delete').mockResolvedValue({});
    deleteFavoriteArticle('slug');

    expect(FetchRequest.prototype.delete).toBeCalledWith('/articles/slug/favorite');
  });
});
