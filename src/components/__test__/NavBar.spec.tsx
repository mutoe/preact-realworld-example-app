import { shallow } from 'enzyme'
import NavBar from '../NavBar'
import { h } from 'preact'
import render from 'preact-render-to-string'
import { useRootState } from '../../store'

jest.mock('../../store')

const useRootStateMock = useRootState as jest.Mock

beforeEach(() => {
  useRootStateMock.mockReturnValue([{ user: null }])
})

afterEach(() => {
  jest.clearAllMocks()
})

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

  it('should jump to My Feed page when "Your Feed" clicked', function () {
    useRootStateMock.mockReturnValue([{ user: { username: 'foo' } }])
    const wrapper = shallow(<NavBar />)
    const myFeedLink = wrapper.findWhere(n => n.type() === 'a' && n.text() === 'Your Feed')

    expect(myFeedLink.props().href).toBe('/my-feeds')
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

  it('should hide "Your Feed" link when not logging', function () {
    const html = render(<NavBar />)
    expect(html).not.toContain('Your Feed')
  })

  it('should display "Your Feed" link when logged', function () {
    useRootStateMock.mockReturnValue([{ user: {} }])

    const html = render(<NavBar />)
    expect(html).toContain('Your Feed')
  })

  it('should highlight global feed and not highlight personal label in home page and user logged', function () {
    useRootStateMock.mockReturnValue([{ user: {} }])
    const wrapper = shallow(<NavBar currentActive="global" />)

    const globalFeedLink = wrapper.findWhere(n => n.type() === 'a' && n.text() === 'Global Feed')
    const personalFeedLink = wrapper.findWhere(n => n.type() === 'a' && n.text() === 'Your Feed')

    expect(globalFeedLink.hasClass('active')).toBe(true)
    expect(personalFeedLink.hasClass('active')).toBe(false)
  })
})
