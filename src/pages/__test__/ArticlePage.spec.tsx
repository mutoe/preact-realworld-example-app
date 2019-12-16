import { shallow } from 'enzyme'
import { h } from 'preact'
import ArticlePage from '../ArticlePage'
import { getArticle } from '../../services'
import { generateArticles } from '../../utils/test-utils'

jest.mock('../../services')

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
    shallow<ArticlePage>(<ArticlePage slug={article.slug} />)
    await new Promise(r => setImmediate(r))

    expect(getArticle).toBeCalledTimes(1)
    expect(getArticle).toBeCalledWith(article.slug)
  })
})
