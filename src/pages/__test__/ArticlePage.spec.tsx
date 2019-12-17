import { shallow } from 'enzyme'
import { h } from 'preact'
import ArticlePage from '../ArticlePage'
import { getArticle } from '../../services'
import { generateArticles } from '../../utils/test-utils'

jest.mock('../../services')

const getArticleMock = getArticle as jest.Mock<Promise<Article>>

beforeEach(() => {
  getArticleMock.mockResolvedValue({} as Article)
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('# Article Page', function () {

  it('should request article when page loaded', async function () {
    const article = generateArticles()
    getArticleMock.mockResolvedValue(article)
    shallow(<ArticlePage slug={article.slug} />)

    expect(getArticle).toBeCalledTimes(1)
    expect(getArticle).toBeCalledWith(article.slug)
  })

  it('should display article info by state', async function () {
    const article = generateArticles()
    getArticleMock.mockResolvedValue(article)
    const wrapper = shallow(<ArticlePage slug={article.slug} />)
    await new Promise(r => setImmediate(r))

    expect(wrapper.find('.banner h1').text()).toBe(article.title)
    expect(wrapper.find('.article-content').text()).toContain(article.body)
  })
})
