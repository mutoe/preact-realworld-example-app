import { shallow } from 'enzyme'
import preact from 'preact'
import PopularTags from 'public/components/PopularTags'
import { getAllTags } from 'public/services'

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

  it('should request all tags when component did mounted', function () {
    shallow(<PopularTags />)

    expect(getAllTags).toBeCalledTimes(1)
  })
})
