import { generateArticles } from '../../utils/test-utils'
import ArticlePreview from '../ArticlePreview'
import { shallow } from 'enzyme'
import { h } from 'preact'
import { deleteFavoriteArticle, postFavoriteArticle } from '../../services'
import Article from '../../pages/Article'

jest.mock('../../services')

afterEach(() => {
  jest.clearAllMocks()
})

describe('# Article Preview Component', () => {
  it('should display article title and description correctly', function () {
    const article = generateArticles()
    const wrapper = shallow(<ArticlePreview article={article} />)

    expect(wrapper.text()).toContain(article.title)
    expect(wrapper.text()).toContain(article.description)
  })

  it('can jump to article detail page when article info clicked', function () {
    const article = generateArticles()
    const wrapper = shallow(<ArticlePreview article={article} />)

    expect(wrapper.find(`.preview-link`).prop(`href`)).toBe(`/article/${article.slug}`)
  })

  it('should display article meta info correctly', function () {
    const article = generateArticles()
    const wrapper = shallow(<ArticlePreview article={article} />)
    const userWrapper = wrapper.find('.article-meta')

    expect(userWrapper.find('img').prop('src')).toBe(article.author.image)
    expect(userWrapper.find('.author').text()).toBe(article.author.username)
    expect(userWrapper.find('.date').text()).toBe(new Date(article.createdAt).toDateString())
  })

  it('should jump to user detail page when user clicked', function () {
    const article = generateArticles()
    const wrapper = shallow(<ArticlePreview article={article} />)
    const userImage = wrapper.find('.article-meta > a')
    const userName = wrapper.find('.article-meta .author')

    expect(userImage.prop('href')).toBe(`/@${article.author.username}`)
    expect(userName.prop('href')).toBe(`/@${article.author.username}`)
  })

  it('should display favorites count correctly', function () {
    const article = generateArticles()
    const wrapper = shallow(<ArticlePreview article={article} />)
    expect(wrapper.find('.article-meta button').text()).toContain(article.favoritesCount)
  })

  it('should trigger request method when favorite button clicked', function () {
    jest.spyOn(ArticlePreview.prototype, 'onFavorite')
    const article = { ...generateArticles(), favorited: false }
    const wrapper = shallow<ArticlePreview>(<ArticlePreview article={article} />)
    wrapper.find('.article-meta button').simulate('click')

    expect(wrapper.instance().onFavorite).toBeCalledTimes(1)
  })

  it('should request favorite article when favorite unfavorited article', async function () {
    (postFavoriteArticle as jest.Mock).mockResolvedValue({})
    const article = { ...generateArticles(), favorited: false }
    const wrapper = shallow<ArticlePreview>(<ArticlePreview article={article} />)
    await wrapper.instance().onFavorite()

    expect(postFavoriteArticle).toBeCalledWith(article.slug)
  })

  it('should request unfavorite article when unfavorite article', async function () {
    (deleteFavoriteArticle as jest.Mock).mockResolvedValue({})
    const article = { ...generateArticles(), favorited: true }
    const wrapper = shallow<ArticlePreview>(<ArticlePreview article={article} />)
    await wrapper.instance().onFavorite()

    expect(deleteFavoriteArticle).toBeCalledWith(article.slug)
  })


})

