import { shallow } from 'enzyme'
import { h } from 'preact'
import ArticlePage from '../ArticlePage'
import { getArticle } from '../../services'
import { generateArticles } from '../../utils/test-utils'

jest.mock('../../services')

beforeEach(() => {
  (getArticle as jest.Mock).mockResolvedValue({})
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('# Article Page', function () {
  it('should trigger fetch method when page loaded', async function () {
    jest.spyOn(ArticlePage.prototype, 'fetchArticle')
    const wrapper = shallow<ArticlePage>(<ArticlePage slug="foo" />)
    await new Promise(r => setImmediate(r))

    expect(wrapper.instance().fetchArticle).toBeCalledTimes(1)
  })

  it('should request when fetch method triggered', async function () {
    const article = generateArticles()
    ;(getArticle as jest.Mock).mockResolvedValue(article)
    const wrapper = shallow<ArticlePage>(<ArticlePage slug={article.slug} />)
    await new Promise(r => setImmediate(r))
    wrapper.update()

    expect(getArticle).toBeCalledTimes(1)
    expect(getArticle).toBeCalledWith(article.slug)
    expect(wrapper.state().article).toMatchObject(article)
  })

  it('should display article info by state', async function () {
    const article = generateArticles()
    ;(getArticle as jest.Mock).mockResolvedValue(article)
    const wrapper = shallow(<ArticlePage slug={article.slug} />)
    await new Promise(r => setImmediate(r))
    wrapper.update()

    expect(wrapper.find('.banner h1').text()).toBe(article.title)
    expect(wrapper.find('.article-content').text()).toContain(article.body)
  })
})
