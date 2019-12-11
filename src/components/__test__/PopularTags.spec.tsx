import PopularTags from '../PopularTags'
import { shallow } from 'enzyme'
import { h } from 'preact'
import { getAllTags } from '../../services'

jest.mock('../../services')

beforeEach(() => {
  (getAllTags as jest.Mock).mockResolvedValue([])
})

describe('# Popular Tags Component', () => {
  it('should display title', function () {
    const wrapper = shallow(<PopularTags />)

    expect(wrapper.text()).toContain('Popular Tags')
  })

  it('should display tags those have in state', function () {
    const wrapper = shallow(<PopularTags />)
    wrapper.setState({ tags: [ 'javascript', 'node' ] })

    wrapper.update()

    expect(wrapper.text()).toContain('javascript')
    expect(wrapper.text()).toContain('node')
    expect(wrapper.text()).not.toContain('rails')
  })

  it('should jump to the tag relative list when a tag clicked', function () {
    const wrapper = shallow(<PopularTags />)
    wrapper.setState({ tags: [ 'javascript' ] })
    wrapper.update()
    const targetTag = wrapper.findWhere(n => n.type() === 'a' && n.text() === 'javascript')

    expect(targetTag.props().href).toBe('/tag/javascript')
  })

  it('should trigger fetch method when component did mounted', function () {
    (getAllTags as jest.Mock).mockResolvedValue([ 'foo', 'bar' ])
    shallow<PopularTags>(<PopularTags />)

    expect(getAllTags).toBeCalled()
  })

  it('should render correct tags after fetch method',async function () {
    (getAllTags as jest.Mock).mockResolvedValue([ 'foo', 'bar' ])
    const wrapper = shallow<PopularTags>(<PopularTags />)
    await wrapper.instance().fetchPopularTags()

    expect(wrapper.state('tags')).toHaveLength(2)
  })
})
