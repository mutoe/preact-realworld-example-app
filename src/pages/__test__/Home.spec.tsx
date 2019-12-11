import { mount, shallow } from 'enzyme'
import Home from '../Home'
import { h } from 'preact'
import NavBar from '../../components/NavBar'
import PopularTags from '../../components/PopularTags'
import { getAllTags, getArticlesByTag } from '../../services'

jest.mock('../../services')

beforeEach(() => {
  (getArticlesByTag as jest.Mock).mockResolvedValue({
    articles: [],
    articlesCount: 0,
  } as ArticleResponse)
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('# Home Page', () => {
  it('should highlight NavBar "Global Feed" label', function () {
    const wrapper = shallow(<Home />)

    expect(wrapper.find(NavBar).prop('currentActive')).toBe('global')
  })

  describe('## Popular Tags', () => {
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

    it('should request tag related article in tag page',async function () {
      (getArticlesByTag as jest.Mock).mockResolvedValue({
        articles: [{}],
        articlesCount: 1,
      } as ArticleResponse)
      const wrapper = shallow<Home>(<Home tag="foo" />)
      await wrapper.instance().fetchFeeds()

      expect(wrapper.state().articlesCount).toBe(1)
    })
  })

})
