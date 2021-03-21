import { mount, shallow } from 'enzyme'
import { h } from 'preact'
import Settings from '../Settings'
import { useRootState } from '../../store'
import { route } from 'preact-router'
import { getInputValue, setInputValue } from '../../utils/test-utils'
import { putProfile } from '../../services'
import { UPDATE_USER } from '../../store/constants'

jest.mock('../../store')
jest.mock('preact-router')
jest.mock('../../services')

const useRootStateMock = useRootState as jest.Mock
const putProfileMock = putProfile as jest.Mock

const imageInputSelector = '[placeholder$="profile picture"]'
const nameInputSelector = '[placeholder="Your Name"]'
const bioInputSelector = '[placeholder="Short bio about you"]'
const emailInputSelector = '[placeholder="Email"]'
const passwordInputSelector = '[placeholder="Password"]'

beforeEach(() => {
  useRootStateMock.mockReturnValue([{ user: {} }, jest.fn()])
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('# Settings page', function () {
  it('should dispatch LOGOUT action when logout button clicked', function () {
    const dispatch = jest.fn()
    useRootStateMock.mockReturnValue([{ user: {} }, dispatch])
    const wrapper = shallow(<Settings />)

    wrapper.find('button.btn-outline-danger').simulate('click')

    expect(dispatch).toBeCalledWith({ type: UPDATE_USER })
  })

  it('should jump to login page after logout or unauthorized', function () {
    useRootStateMock.mockReturnValue([{ user: null }, jest.fn()])
    shallow(<Settings />)

    expect(route).toBeCalledTimes(1)
    expect(route).toBeCalledWith('/login')
  })

  it('should fill profile when page loaded', function () {
    const user: User = {
      username: 'username',
      bio: 'bio',
      email: 'test@example.com',
      id: 2,
      image: 'image',
      token: 'token',
    }
    useRootStateMock.mockReturnValue([{ user }, jest.fn()])
    const wrapper = mount(<Settings />)

    expect(getInputValue(wrapper, imageInputSelector)).toBe(user.image)
    expect(getInputValue(wrapper, nameInputSelector)).toBe(user.username)
    expect(getInputValue(wrapper, bioInputSelector)).toBe(user.bio)
    expect(getInputValue(wrapper, emailInputSelector)).toBe(user.email)
    expect(getInputValue(wrapper, passwordInputSelector)).toBe('')
  })

  it('should call put profile service when update button clicked', function () {
    const wrapper = mount(<Settings />)
    setInputValue(wrapper, bioInputSelector, 'foo')

    wrapper.find('form button').simulate('click')

    expect(putProfile).toBeCalledWith({ bio: 'foo' })
  })

  it('should set update button disabled when form fields is empty', function () {
    const wrapper = shallow(<Settings />)

    expect(wrapper.find('form button').props().disabled).toBeTruthy()
  })

  it('should set update button enabled when form has a field', function () {
    const wrapper = mount(<Settings />)
    setInputValue(wrapper, emailInputSelector, 'foo')

    expect(wrapper.find('form button').props().disabled).toBeFalsy()
  })

  it('should update user state after submit', async function () {
    const dispatch = jest.fn()
    useRootStateMock.mockReturnValue([{ user: {} }, dispatch])
    putProfileMock.mockResolvedValue({ email: 'foo' })
    const wrapper = mount(<Settings />)
    setInputValue(wrapper, emailInputSelector, 'foo')
    wrapper.find('form button').simulate('click')
    await new Promise(r => setImmediate(r))

    expect(dispatch).toBeCalledTimes(1)
    expect(dispatch).toBeCalledWith({ type: UPDATE_USER, user: { email: 'foo' } })
  })
})
