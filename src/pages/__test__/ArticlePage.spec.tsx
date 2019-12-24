import { shallow } from 'enzyme'
import { h } from 'preact'
import ArticlePage from '../ArticlePage'
import { getArticle, getCommentsByArticle } from '../../services'
import { generateArticles } from '../../utils/test-utils'
import ArticleMeta from '../../components/ArticleMeta'

jest.mock('../../services')

const getArticleMock = getArticle as jest.Mock<Promise<Article>>
const getCommentsByArticleMock = getCommentsByArticle as jest.Mock<Promise<Comment[]>>

beforeEach(() => {
  getArticleMock.mockResolvedValue({} as Article)
  getCommentsByArticleMock.mockResolvedValue([])
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

    expect(wrapper.find(ArticleMeta)).toHaveLength(2)
    expect(wrapper.find(ArticleMeta).at(0).props().article).toMatchObject(article)
  })

  it('should request comments when page loaded', function () {
    shallow(<ArticlePage slug="slug" />)

    expect(getCommentsByArticle).toBeCalledTimes(1)
    expect(getCommentsByArticle).toBeCalledWith('slug')
  })
})
