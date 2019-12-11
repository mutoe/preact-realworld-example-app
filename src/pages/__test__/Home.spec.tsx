import { mount, shallow } from 'enzyme'
import Home from '../Home'
import { h } from 'preact'
import NavBar from '../../components/NavBar'
import PopularTags from '../../components/PopularTags'

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
      const wrapper = mount(<Home tag="foo" />)

      const navBarWrapper = wrapper.find(NavBar)

      expect(navBarWrapper.text()).toContain('foo')
    })
  })

})
