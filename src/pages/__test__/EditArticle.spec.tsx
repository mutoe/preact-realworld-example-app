import { mount, shallow } from 'enzyme'
import EditArticle from '../EditArticle'
import { h } from 'preact'
import FetchRequest from '../../utils/request'
import { getArticle, postArticle, putArticle } from '../../services'
import { route } from 'preact-router'
import { generateArticles, getInputValue, setInputValue } from '../../utils/test-utils'

jest.mock('../../services')
jest.mock('preact-router')

const postArticleMock = postArticle as jest.Mock<Promise<Article>>
const getArticleMock = getArticle as jest.Mock<Promise<Article>>
const putArticleMock = putArticle as jest.Mock<Promise<Article>>

const titleInputSelector = '[placeholder="Article Title"]'
const descriptionInputSelector = '[placeholder^="What\'s this article"]'
const bodyInputSelector = '[placeholder^="Write your article"]'
const tagInputSelector = '[placeholder="Enter tags"]'

beforeEach(() => {
  postArticleMock.mockResolvedValue({} as Article)
  putArticleMock.mockResolvedValue({} as Article)
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('# Create Article', function () {
  it('should set button disabled when title, description or body is empty', function () {
    jest.spyOn(FetchRequest.prototype, 'post').mockImplementation()
    const wrapper = shallow(<EditArticle />)

    const submitButton = wrapper.find('form button')
    expect(submitButton.prop('disabled')).toBe(true)
  })

  it('should send request when title, description and body are filled', function () {
    const wrapper = mount(<EditArticle />)
    setInputValue(wrapper, titleInputSelector, 'title')
    setInputValue(wrapper, descriptionInputSelector, 'description')
    setInputValue(wrapper, bodyInputSelector, 'body')

    wrapper.find('form').simulate('submit')

    expect(postArticle).toBeCalled()
  })

  it('should jump to article detail page after submit success', async function () {
    const article = generateArticles()
    postArticleMock.mockResolvedValue(article)
    const wrapper = mount(<EditArticle />)
    setInputValue(wrapper, titleInputSelector, article.title)
    setInputValue(wrapper, descriptionInputSelector, article.description)
    setInputValue(wrapper, bodyInputSelector, article.body)

    wrapper.find('form').simulate('submit')
    await new Promise(r => setImmediate(r))

    expect(postArticle).toBeCalledTimes(1)
    expect(route).toBeCalledWith(`/article/${article.slug}`)
  })

  it('should be send tags as string array', function () {
    const wrapper = mount(<EditArticle />)
    setInputValue(wrapper, titleInputSelector, 'title')
    setInputValue(wrapper, descriptionInputSelector, 'description')
    setInputValue(wrapper, bodyInputSelector, 'body')
    setInputValue(wrapper, tagInputSelector, 'foo bar')

    wrapper.find('form').simulate('submit')

    expect(postArticle).toBeCalledWith(expect.objectContaining({
      tagList: ['foo', 'bar'],
    }))
  })
})

describe('# Edit article', function () {
  it('should be fetch exist article when component did mount', function () {
    const article = generateArticles()
    getArticleMock.mockResolvedValue(article)
    shallow(<EditArticle slug={article.slug} />)

    expect(getArticle).toBeCalledTimes(1)
    expect(getArticle).toBeCalledWith(article.slug)
  })

  it('should fill form after fetch exist form', async function () {
    const article = generateArticles()
    getArticleMock.mockResolvedValue(article)
    const wrapper = mount(<EditArticle slug={article.slug} />)
    await new Promise(r => setImmediate(r))

    expect(getInputValue(wrapper, titleInputSelector)).toBe(article.title)
    expect(getInputValue(wrapper, descriptionInputSelector)).toBe(article.description)
    expect(getInputValue(wrapper, bodyInputSelector)).toBe(article.body)
    expect(getInputValue(wrapper, tagInputSelector)).toBe(article.tagList.join(' '))
  })

  it('should send put request when form submitted', async function () {
    const article = generateArticles()
    getArticleMock.mockResolvedValue(article)
    const wrapper = mount(<EditArticle slug={article.slug} />)
    await new Promise(r => setImmediate(r))

    wrapper.find('form').simulate('submit')

    expect(putArticle).toBeCalledTimes(1)
    expect(putArticle).toBeCalledWith(article.slug, expect.objectContaining({
      title: article.title,
    }))
  })
})
