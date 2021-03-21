import { h } from 'preact'
import { shallow } from 'enzyme'

import PopularTags from '../../src/components/PopularTags'
import { getAllTags } from '../../src/services'

jest.mock('../../src/services')

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
