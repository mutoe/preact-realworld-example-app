import { shallow } from 'enzyme'
import Home from '../Home'
import { h } from 'preact'
import NavBar from '../../components/NavBar'
import PopularTags from '../../components/PopularTags'

describe('# Home Page', () => {
  it('should highlight NavBar "Global Feed" label', function () {
    const wrapper = shallow(<Home />)

    expect(wrapper.find(NavBar).prop('currentActive')).toBe('global')
  })

  it('should have popular tags module', function () {
    const wrapper = shallow(<Home />)

    expect(wrapper.find(PopularTags)).toHaveLength(1)
  })
})
