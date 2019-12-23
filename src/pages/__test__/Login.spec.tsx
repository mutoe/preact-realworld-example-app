import { h } from 'preact'
import Login from '../Login'
import { postLogin } from '../../services'
import { route } from 'preact-router'
import { mount } from 'enzyme'
import { setInputValue } from '../../utils/test-utils'
import { useRootState } from '../../store'
import { login } from '../../store/actions'

jest.mock('../../services')
jest.mock('preact-router')
jest.mock('../../store/actions')
jest.mock('../../store')

const postLoginMock = postLogin as jest.Mock
const useRootStateMock = useRootState as jest.Mock
const loginMock = login as jest.Mock<Promise<Action>>

const emailInputSelector = '[placeholder="Email"]'
const passwordInputSelector = '[placeholder="Password"]'

beforeEach(() => {
  useRootStateMock.mockReturnValue([ { user: null }, jest.fn() ])
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('# Login form validate', () => {
  it('should set button disabled when submit a empty form field', function () {
    const wrapper = mount(<Login />)

    setInputValue(wrapper, emailInputSelector, '123')

    const loginButton = wrapper.find('form button.btn-lg.btn-primary')
    expect(loginButton.props().disabled).toBe(true)
  })

  it('should not send form when given invalid email format', function () {
    const wrapper = mount(<Login />)
    setInputValue(wrapper, emailInputSelector, '123')
    setInputValue(wrapper, passwordInputSelector, '123')

    const loginButton = wrapper.find('form button.btn-lg.btn-primary')
    loginButton.simulate('click')

    expect(postLogin).not.toBeCalled()
  })

  it('should display error messages when errors is displayed', async function () {
    useRootStateMock.mockReturnValue([
      {
        user: null,
        errors: {
          'email': [ 'is already exists' ],
          'password': [ 'is too long' ],
        },
      }, jest.fn(),
    ])
    const wrapper = mount(<Login />)
    setInputValue(wrapper, emailInputSelector, 'test@example.com')
    setInputValue(wrapper, passwordInputSelector, '12345678')

    wrapper.find('form').simulate('submit')
    await new Promise(r => setImmediate(r))
    wrapper.update()

    expect(wrapper.find('.error-messages > li')).toHaveLength(2)
    expect(wrapper.find('.error-messages').text()).toContain('email is already exists')
    expect(wrapper.find('.error-messages').text()).toContain('password is too long')
  })
})

describe('# Login request', () => {
  it('should be dispatch login action when sign in button clicked', async function () {
    const form = { email: 'test@example.com', password: '12345678' }
    const wrapper = mount(<Login />)
    setInputValue(wrapper, emailInputSelector, form.email)
    setInputValue(wrapper, passwordInputSelector, form.password)

    wrapper.find('form').simulate('submit')

    expect(login).toBeCalledTimes(1)
    expect(login).toBeCalledWith(form)
  })

  it('should not be send when given invalid form', function () {
    const wrapper = mount(<Login />)
    setInputValue(wrapper, emailInputSelector, '123')
    setInputValue(wrapper, passwordInputSelector, '12345678')
    wrapper.find('form').simulate('submit')

    expect(postLogin).not.toBeCalled()
  })

  it('should can goto home page after logged', async function () {
    const Comp = () => {
      Login()

      return <div />
    }
    useRootStateMock.mockReturnValue([ { user: null }, jest.fn() ])
    const wrapper = mount(<Comp />)
    useRootStateMock.mockReturnValue([ { user: {} }, jest.fn() ])
    wrapper.mount()

    expect(route).toBeCalledWith('/')
  })

  // TODO: move this assert to reducer
  it.skip('should save token locally when login successful', async function () {
    const result = {
      id: 1,
      email: 'test@example.com',
      username: 'test',
      bio: null,
      image: null,
      token: 'foobar',
    }
    postLoginMock.mockResolvedValue(result)
    jest.spyOn(global.localStorage, 'setItem')
    const wrapper = mount(<Login />)
    setInputValue(wrapper, emailInputSelector, 'test@example.com')
    setInputValue(wrapper, passwordInputSelector, '12345678')
    wrapper.find('form').simulate('submit')
    await new Promise(r => setImmediate(r))

    expect(global.localStorage.setItem).toBeCalledWith('user', JSON.stringify(result))
  })
})

