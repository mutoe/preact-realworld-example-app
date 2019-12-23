import { mount, shallow } from 'enzyme'
import { h } from 'preact'
import Settings from '../Settings'
import { useRootState } from '../../store'
import { LOGOUT } from '../../store/constants'
import { route } from 'preact-router'
import { getInputValue } from '../../utils/test-utils'

jest.mock('../../store')
jest.mock('preact-router')

const useRootStateMock = useRootState as jest.Mock

const imageInputSelector = '[placeholder$="profile picture"]'
const nameInputSelector = '[placeholder="Your Name"]'
const bioInputSelector = '[placeholder="Short bio about you"]'
const emailInputSelector=  '[placeholder="Email"]'
const passwordInputSelector=  '[placeholder="Password"]'

beforeEach(() => {
  useRootStateMock.mockReturnValue([ { user: {} }, jest.fn() ])
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('# Settings page', function () {
  it('should dispatch LOGOUT action when logout button clicked', function () {
    const dispatch = jest.fn()
    useRootStateMock.mockReturnValue([ { user: {} }, dispatch ])
    const wrapper = shallow(<Settings />)

    wrapper.find('button.btn-outline-danger').simulate('click')

    expect(dispatch).toBeCalledWith({ type: LOGOUT })
  })

  it('should jump to login page after logout or unauthorized', function () {
    useRootStateMock.mockReturnValue([ { user: null }, jest.fn() ])
    shallow(<Settings />)

    expect(route).toBeCalledTimes(1)
    expect(route).toBeCalledWith('/login')
  })

  it('should fill profile when page loaded', function () {
    const user: UserWithToken = {
      username: 'username',
      bio: 'bio',
      email: 'test@example.com',
      id: 2,
      image: 'image',
      token: 'token',
    }
    useRootStateMock.mockReturnValue([ { user }, jest.fn() ])
    const wrapper = mount(<Settings />)

    expect(getInputValue(wrapper, imageInputSelector)).toBe(user.image)
    expect(getInputValue(wrapper, nameInputSelector)).toBe(user.username)
    expect(getInputValue(wrapper, bioInputSelector)).toBe(user.bio)
    expect(getInputValue(wrapper, emailInputSelector)).toBe(user.email)
    expect(getInputValue(wrapper, passwordInputSelector)).toBe('')
  })
})
