import PopularTags from '../PopularTags'
import { shallow } from 'enzyme'
import { h } from 'preact'
import { getAllTags } from '../../services'

jest.mock('../../services')

const getAllTagsMock = getAllTags as jest.Mock<Promise<string[]>>

beforeEach(() => {
  getAllTagsMock.mockResolvedValue([])
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('# Popular Tags Component', () => {
  it('should display title', function () {
    const wrapper = shallow(<PopularTags />)

    expect(wrapper.text()).toContain('Popular Tags')
  })

  it('should display tags those have in state', async function () {
    getAllTagsMock.mockResolvedValue(['javascript', 'node'])
    const wrapper = shallow(<PopularTags />)
    await new Promise(r => setImmediate(r))

    expect(wrapper.text()).toContain('javascript')
    expect(wrapper.text()).toContain('node')
    expect(wrapper.text()).not.toContain('rails')
  })

  it('should jump to the tag relative list when a tag clicked', async function () {
    getAllTagsMock.mockResolvedValue(['javascript'])
    const wrapper = shallow(<PopularTags />)
    await new Promise(r => setImmediate(r))
    const targetTag = wrapper.findWhere(n => n.type() === 'a' && n.text() === 'javascript')

    expect(targetTag.props().href).toBe('/tag/javascript')
  })

  it('should request all tags when component did mounted', function () {
    shallow(<PopularTags />)

    expect(getAllTags).toBeCalledTimes(1)
  })
})
