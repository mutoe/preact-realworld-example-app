import { shallow } from 'enzyme'
import NavBar from '../NavBar'
import { h } from 'preact'

describe('# Navigation Bar Component', () => {
  it('should display "Global Feed" item always', function () {
    const wrapper = shallow(<NavBar />)

    expect(wrapper.text()).toContain('Global Feed')
  })

  it('should jump to Home page when "Global Feed" clicked', function () {
    const wrapper = shallow(<NavBar />)
    const globalFeedLink = wrapper.findWhere(n => n.type() === 'a' && n.text() === 'Global Feed')

    expect(globalFeedLink.props().href).toBe('/')
  })
})
