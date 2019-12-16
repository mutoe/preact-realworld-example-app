import { mount, shallow } from 'enzyme'
import Home from '../Home'
import { h } from 'preact'
import NavBar from '../../components/NavBar'
import PopularTags from '../../components/PopularTags'
import { getAllTags, getArticles, getArticlesByTag } from '../../services'
import { generateArticles } from '../../utils/test-utils'
import ArticlePreview from '../../components/ArticlePreview'

jest.mock('../../services')

beforeEach(() => {
  (getArticlesByTag as jest.Mock).mockResolvedValue({
    articles: [],
    articlesCount: 0,
  } as ArticlesResponse);
  (getArticles as jest.Mock).mockResolvedValue({
    articles: [],
    articlesCount: 0,
  } as ArticlesResponse)
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('# Home Page', () => {
  it('should highlight NavBar "Global Feed" label', function () {
    const wrapper = shallow(<Home />)

    expect(wrapper.find(NavBar).prop('currentActive')).toBe('global')
  })
})

describe('# Feeds list', () => {
  it('should display given feed correctly', function () {
    const articles = generateArticles(3)
    const wrapper = shallow<Home>(<Home />)
    wrapper.setState({ articles, articlesCount: 3 })
    wrapper.update()

    expect(wrapper.find(ArticlePreview)).toHaveLength(3)
  })

  it('should passed article prop to ArticlePreview component', function () {
    const articles = generateArticles(2)
    const wrapper = shallow<Home>(<Home />)
    wrapper.setState({ articles, articlesCount: 2 })
    wrapper.update()

    expect(wrapper.find(ArticlePreview).at(0).props().article).toBe(articles[0])
  })

  it('should fetch all feeds in Home page', async function () {
    jest.spyOn(Home.prototype, 'fetchFeeds')
    const wrapper = shallow<Home>(<Home />)

    expect(wrapper.instance().fetchFeeds).toBeCalledTimes(1)
  })

  it('should request all article in Home page', async function () {
    (getArticles as jest.Mock).mockResolvedValue({
      articles: [ {} ],
      articlesCount: 1,
    } as ArticlesResponse)
    const wrapper = shallow<Home>(<Home />)
    await wrapper.instance().fetchFeeds()

    expect(wrapper.state().articlesCount).toBe(1)
  })
})

describe('# Popular Tags', () => {
  it('should have popular tags module', function () {
    const wrapper = shallow(<Home />)

    expect(wrapper.find(PopularTags)).toHaveLength(1)
  })

  it('should highlight NavBar tag label in tag page', function () {
    const wrapper = shallow(<Home tag="foo" />)

    expect(wrapper.find(NavBar).prop('currentActive')).toBe('tag')
  })

  it('should display NavBar tag name in tag page', function () {
    (getAllTags as jest.Mock).mockResolvedValue([])
    const wrapper = mount(<Home tag="foo" />)

    const navBarWrapper = wrapper.find(NavBar)

    expect(navBarWrapper.text()).toContain('foo')
  })

  it('should fetch the tag-related feeds in tag page', async function () {
    jest.spyOn(Home.prototype, 'fetchFeeds')
    const wrapper = shallow<Home>(<Home tag="foo" />)

    expect(wrapper.instance().fetchFeeds).toBeCalledTimes(1)
  })

  it('should request tag related article in tag page', async function () {
    (getArticlesByTag as jest.Mock).mockResolvedValue({
      articles: [ {} ],
      articlesCount: 1,
    } as ArticlesResponse)
    const wrapper = shallow<Home>(<Home tag="foo" />)
    await wrapper.instance().fetchFeeds()

    expect(wrapper.state().articlesCount).toBe(1)
  })
})
