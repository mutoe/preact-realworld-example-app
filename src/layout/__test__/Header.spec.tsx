import { mount } from 'enzyme'
import { h } from 'preact'
import { useContext } from 'preact/hooks'
import { initialRootState } from '../../stores/globalContext'
import Header from '../Header'

jest.mock('preact/hooks', () => ({
  useContext: jest.fn(() => initialRootState),
}))

afterEach(() => {
  jest.resetAllMocks()
})

describe('# Header Component', () => {
  it('should hidden post and settings and display logging buttons when not logged', () => {
    (useContext as jest.Mock).mockReturnValue({
      user: null,
    })
    const wrapper = mount(<Header />)

    expect(wrapper.findWhere(n => n.type() === 'a' && /Sign in/.test(n.text()))).toHaveLength(1)
    expect(wrapper.findWhere(n => n.type() === 'a' && /Sign up/.test(n.text()))).toHaveLength(1)
    expect(wrapper.findWhere(n => n.type() === 'a' && /Settings/.test(n.text()))).toHaveLength(0)
    expect(wrapper.findWhere(n => n.type() === 'a' && /New Post/.test(n.text()))).toHaveLength(0)
  })

  it('should display post and settings and hidden logging buttons when logged', () => {
    (useContext as jest.Mock).mockReturnValue({
      user: {},
    })
    const wrapper = mount(<Header />)

    expect(wrapper.findWhere(n => n.type() === 'a' && /Sign in/.test(n.text()))).toHaveLength(0)
    expect(wrapper.findWhere(n => n.type() === 'a' && /Sign up/.test(n.text()))).toHaveLength(0)
    expect(wrapper.findWhere(n => n.type() === 'a' && /Settings/.test(n.text()))).toHaveLength(1)
    expect(wrapper.findWhere(n => n.type() === 'a' && /New Post/.test(n.text()))).toHaveLength(1)
  })
})
