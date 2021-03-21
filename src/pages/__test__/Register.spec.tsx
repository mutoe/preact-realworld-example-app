import { mount, shallow } from 'enzyme'
import { h } from 'preact'
import { postRegister } from '../../services'
import Register from '../Register'
import { route } from 'preact-router'
import { setInputValue } from '../../utils/test-utils'

jest.mock('../../services')
jest.mock('preact-router')

const postRegisterMock = postRegister as jest.Mock<Promise<User>>

const emailInputSelector = '[placeholder="Email"]'
const passwordInputSelector = '[placeholder="Password"]'
const usernameInputSelector = '[placeholder="Your Name"]'

const resolvedResult = {
  id: 1,
  email: 'test@example.com',
  username: 'test',
  bio: null,
  image: null,
  token: 'foobar',
}

const mockResolvedPostRegister = () => {
  postRegisterMock.mockResolvedValue(resolvedResult)
}

afterEach(() => {
  jest.clearAllMocks()
})

describe('# Register error message', () => {
  it('should be show error message when given response error', async function () {
    postRegisterMock.mockRejectedValue({
      errors: {
        password: ['is invalid'],
      },
    })
    const wrapper = shallow(<Register />)
    wrapper.find('form button.btn-lg.btn-primary').simulate('click')
    await new Promise(r => setImmediate(r))

    expect(wrapper.find('.error-messages')).toHaveLength(1)
    expect(wrapper.find('.error-messages').text()).toContain('password is invalid')
  })

  it('should be show multiple errors when given multiple response errors', async function () {
    postRegisterMock.mockRejectedValue({
      errors: {
        email: ['is already exists'],
        password: ['is too long'],
      },
    })
    const wrapper = shallow(<Register />)
    wrapper.find('form button.btn-lg.btn-primary').simulate('click')
    await new Promise(r => setImmediate(r))

    expect(wrapper.find('.error-messages > li')).toHaveLength(2)
  })
})

describe('# Register form validate', () => {
  it('should set button disabled when submit a empty form field', function () {
    const wrapper = mount(<Register />)
    setInputValue(wrapper, emailInputSelector, '123')
    wrapper.update()

    const submitButton = wrapper.find('form button.btn-lg.btn-primary')
    expect(submitButton.props().disabled).toBe(true)
  })

  it('should not be send when given invalid form', function () {
    const wrapper = mount(<Register />)
    setInputValue(wrapper, emailInputSelector, '123')
    setInputValue(wrapper, usernameInputSelector, '123')
    setInputValue(wrapper, passwordInputSelector, '123')
    wrapper.find('form button.btn-lg.btn-primary').simulate('click')

    expect(postRegister).not.toBeCalled()
  })
})

describe('# Register request', () => {
  it('should be send form when sign up button clicked', function () {
    const wrapper = mount(<Register />)
    setInputValue(wrapper, emailInputSelector, 'test@example.com')
    setInputValue(wrapper, usernameInputSelector, 'test')
    setInputValue(wrapper, passwordInputSelector, '12345678')

    wrapper.find('form button.btn-lg.btn-primary').simulate('click')

    expect(postRegister).toBeCalledTimes(1)
  })

  it('can set error messages correctly when received error response', async function () {
    postRegisterMock.mockRejectedValue({
      errors: { 'email and password': ['is invalid'] },
    })
    const wrapper = mount(<Register />)
    setInputValue(wrapper, emailInputSelector, 'bad_account@example.com')
    setInputValue(wrapper, usernameInputSelector, 'test')
    setInputValue(wrapper, passwordInputSelector, '12345678')

    wrapper.find('form button.btn-lg.btn-primary').simulate('click')
    expect(postRegister).toBeCalled()
    await new Promise(r => setImmediate(r))

    expect(wrapper.find('.error-messages').text()).toContain('email and password')
  })

  it('should can goto home page when entering the correct account', async function () {
    mockResolvedPostRegister()
    const wrapper = mount(<Register />)
    setInputValue(wrapper, emailInputSelector, 'test@example.com')
    setInputValue(wrapper, usernameInputSelector, 'test')
    setInputValue(wrapper, passwordInputSelector, '12345678')

    wrapper.find('form button.btn-lg.btn-primary').simulate('click')
    await new Promise(r => setImmediate(r))

    expect(route).toBeCalledWith('/')
  })

  it('should save token locally when register successful', async function () {
    mockResolvedPostRegister()
    const wrapper = mount(<Register />)
    jest.spyOn(global.localStorage, 'setItem')
    setInputValue(wrapper, emailInputSelector, 'test@example.com')
    setInputValue(wrapper, usernameInputSelector, 'test')
    setInputValue(wrapper, passwordInputSelector, '12345678')

    wrapper.find('form button.btn-lg.btn-primary').simulate('click')
    await new Promise(r => setImmediate(r))

    expect(global.localStorage.setItem).toBeCalledWith('token', JSON.stringify(resolvedResult))
  })
})
