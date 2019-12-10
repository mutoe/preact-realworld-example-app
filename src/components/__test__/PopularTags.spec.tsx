import PopularTags from '../PopularTags'
import { shallow } from 'enzyme'
import { h } from 'preact'

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
})
