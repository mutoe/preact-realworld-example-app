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

  it('should hide "Your Feed" link when not logging', function () {
    const wrapper = shallow(<NavBar />)
    const myFeedLink = wrapper.findWhere(n => n.type() === 'a' && n.text() === 'Your Feed')

    expect(myFeedLink.props().href).toBe('/my-feed')
  })

  it('should be highlighted when the label is activated', function () {
    const wrapper = shallow(<NavBar currentActive="global" />)
    const globalFeedLink = wrapper.findWhere(n => n.type() === 'a' && n.text() === 'Global Feed')


    expect(globalFeedLink.hasClass('active')).toBe(true)
  })

  it('should not be highlighted when label is inactivated', function () {
    const wrapper = shallow(<NavBar currentActive="personal" />)
    const globalFeedLink = wrapper.findWhere(n => n.type() === 'a' && n.text() === 'Global Feed')

    expect(globalFeedLink.hasClass('active')).toBe(false)
  })
})
