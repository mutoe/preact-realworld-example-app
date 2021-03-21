<<<<<<< HEAD:test/components/ArticleMeta.spec.tsx
import { h } from 'preact'
import render from 'preact-render-to-string'
import { shallow } from 'enzyme'

import ArticleMeta from '../../src/components/ArticleMeta'
import { generateArticles } from '../utils/test-utils'
import { deleteFavoriteArticle, deleteFollowProfile, postFavoriteArticle, postFollowProfile } from '../../src/services'

jest.mock('../../src/services')
=======
import render from 'preact-render-to-string';
import ArticleMeta from '../ArticleMeta';
import { h } from 'preact';
import { shallow } from 'enzyme';
import { generateArticles } from '../../utils/test-utils';
import {
  deleteFavoriteArticle,
  deleteFollowProfile,
  postFavoriteArticle,
  postFollowProfile,
} from '../../services';

jest.mock('../../services');
>>>>>>> 2b7be12 (style: Switching to Preact code style):src/components/__test__/ArticleMeta.spec.tsx

describe('# Article meta component', () => {
  const setArticle = jest.fn();

  it('should match snapshot', () => {
    const article = {
      title: 'title',
      slug: 'title-slug',
      body: 'body',
      createdAt: '1991-09-29T00:00:00.000Z',
      updatedAt: '2016-10-14T00:00:00.000Z',
      tagList: ['foo', 'bar', 'baz'],
      description: 'description',
      favorited: false,
      favoritesCount: 34,
      author: {
        username: 'Brenda Taylor',
        bio: 'bio.',
        image: 'http://dummyimage.com/234x60',
        following: false,
      },
    };
    const wrapper = render(<ArticleMeta article={article} setArticle={setArticle} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should follow user correctly', async () => {
    const article = generateArticles();
    article.author.following = false;
    const wrapper = shallow(<ArticleMeta article={article} setArticle={setArticle} />);
    const followButton = wrapper.find('.ion-plus-round').parents('button');
    followButton.simulate('click');

    expect(postFollowProfile).toBeCalledTimes(1);
    expect(postFollowProfile).toBeCalledWith(article.author.username);
  });

  it('should unfollow user correctly', async () => {
    const article = generateArticles();
    article.author.following = true;
    const wrapper = shallow(<ArticleMeta article={article} setArticle={setArticle} />);
    const followButton = wrapper.find('.ion-plus-round').parents('button');
    followButton.simulate('click');

    expect(deleteFollowProfile).toBeCalledTimes(1);
    expect(deleteFollowProfile).toBeCalledWith(article.author.username);
  });

  it('should favorite article correctly', () => {
    const article = generateArticles();
    article.favorited = false;
    const wrapper = shallow(<ArticleMeta article={article} setArticle={setArticle} />);
    const favoriteButton = wrapper.find('.ion-heart').parents('button');
    favoriteButton.simulate('click');

    expect(postFavoriteArticle).toBeCalledTimes(1);
    expect(postFavoriteArticle).toBeCalledWith(article.slug);
  });

  it('should unfavored article correctly', () => {
    const article = generateArticles();
    article.favorited = true;
    const wrapper = shallow(<ArticleMeta article={article} setArticle={setArticle} />);
    const favoriteButton = wrapper.find('.ion-heart').parents('button');
    favoriteButton.simulate('click');

    expect(deleteFavoriteArticle).toBeCalledTimes(1);
    expect(deleteFavoriteArticle).toBeCalledWith(article.slug);
  });
});
