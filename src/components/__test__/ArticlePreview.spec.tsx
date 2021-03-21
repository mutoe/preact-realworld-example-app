import { generateArticles } from '../../utils/test-utils'
import ArticlePreview from '../ArticlePreview'
import { shallow } from 'enzyme'
import { h } from 'preact'
import { deleteFavoriteArticle, postFavoriteArticle } from '../../services'

jest.mock('../../services')

const setArticle = jest.fn()

afterEach(() => {
  jest.clearAllMocks()
})

describe('# Article Preview Component', () => {
  it('should display article title and description correctly', function () {
    const article = generateArticles()
    const wrapper = shallow(<ArticlePreview article={article} setArticle={setArticle} />)

    expect(wrapper.text()).toContain(article.title)
    expect(wrapper.text()).toContain(article.description)
  })

  it('can jump to article detail page when article info clicked', function () {
    const article = generateArticles()
    const wrapper = shallow(<ArticlePreview article={article} setArticle={setArticle} />)

    expect(wrapper.find('.preview-link').prop('href')).toBe(`/article/${article.slug}`)
  })

  it('should display article meta info correctly', function () {
    const article = generateArticles()
    const wrapper = shallow(<ArticlePreview article={article} setArticle={setArticle} />)
    const userWrapper = wrapper.find('.article-meta')

    expect(userWrapper.find('img').prop('src')).toBe(article.author.image)
    expect(userWrapper.find('.author').text()).toBe(article.author.username)
    expect(userWrapper.find('.date').text()).toBe(new Date(article.createdAt).toDateString())
  })

  it('should jump to user detail page when user clicked', function () {
    const article = generateArticles()
    const wrapper = shallow(<ArticlePreview article={article} setArticle={setArticle} />)
    const userImage = wrapper.find('.article-meta > a')
    const userName = wrapper.find('.article-meta .author')

    expect(userImage.prop('href')).toBe(`/@${article.author.username}`)
    expect(userName.prop('href')).toBe(`/@${article.author.username}`)
  })
})

describe('# Favorite article', () => {
  it('should display favorites count correctly', function () {
    const article = generateArticles()
    const wrapper = shallow(<ArticlePreview article={article} setArticle={setArticle} />)
    expect(wrapper.find('.article-meta button').text()).toContain(article.favoritesCount)
  })

  it('should request favorite article when favorite unfavorited article', async function () {
    (postFavoriteArticle as jest.Mock).mockResolvedValue({})
    const article = { ...generateArticles(), favorited: false }
    const wrapper = shallow(<ArticlePreview article={article} setArticle={setArticle} />)
    wrapper.find('.article-meta button').simulate('click')

    expect(postFavoriteArticle).toBeCalledWith(article.slug)
  })

  it('should request unfavorite article when unfavorite article', async function () {
    (deleteFavoriteArticle as jest.Mock).mockResolvedValue({})
    const article = { ...generateArticles(), favorited: true }
    const wrapper = shallow(<ArticlePreview article={article} setArticle={setArticle} />)
    wrapper.find('.article-meta button').simulate('click')

    expect(deleteFavoriteArticle).toBeCalledWith(article.slug)
  })

  it('should highlight favorite button when article was favorited', function () {
    const article = { ...generateArticles(), favorited: true }
    const wrapper = shallow(<ArticlePreview article={article} setArticle={setArticle} />)

    expect(wrapper.find('.article-meta button').hasClass('btn-primary')).toBe(true)
  })

  it('should not highlight favorite button when article was not favorited', function () {
    const article = { ...generateArticles(), favorited: false }
    const wrapper = shallow(<ArticlePreview article={article} setArticle={setArticle} />)

    expect(wrapper.find('.article-meta button').hasClass('btn-outline-primary')).toBe(true)
  })

  it('should update article info when favorite / unfavorite article', async function () {
    (postFavoriteArticle as jest.Mock).mockResolvedValue({ favorited: true, favoritesCount: 1 })
    const article = { ...generateArticles(), favorited: false, favoritesCount: 0 }
    const wrapper = shallow(<ArticlePreview article={article} setArticle={setArticle} />)
    expect(wrapper.find('.article-meta button').hasClass('btn-outline-primary')).toBe(true)

    wrapper.find('.article-meta button').simulate('click')
    await new Promise(r => setImmediate(r))

    expect(setArticle).toBeCalledTimes(1)
    expect(setArticle).toBeCalledWith({ favorited: true, favoritesCount: 1 })
  })
})
