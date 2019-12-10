import { shallow } from 'enzyme'
import NavBar from '../NavBar'
import { h } from 'preact'

describe('# Navigation Bar Component', () => {
  it('should display "Global Feed" item always', function () {
    const wrapper = shallow(<NavBar />)

    expect(wrapper.text()).toContain('Global Feed')
  })
})
