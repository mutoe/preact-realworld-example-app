import PopularTags from '../PopularTags'
import { shallow } from 'enzyme'
import { h } from 'preact'

describe('# Popular Tags Component', () => {
  it('should display title', function () {
    const wrapper = shallow(<PopularTags />)

    expect(wrapper.text()).toContain('Popular Tags')
  })
})
