import { shallow } from 'enzyme'
import { h } from 'preact'
import Login from '../Login'
import { postLogin } from '../../services'
import { route } from 'preact-router'

jest.mock('../../services')
jest.mock('preact-router')

afterEach(() => {
  jest.clearAllMocks()
})

describe('# Login form validate', () => {
  it.skip('should set button disabled when submit a empty form field', function () {
    const wrapper = shallow(<Login />)
    const loginButton = wrapper.find('form button.btn-lg.btn-primary')
    wrapper.setState({
      email: '123',
      password: '',
    })

    wrapper.update()

    expect(loginButton.props().disabled).toBe(true)
  })

  it.skip('should not send form when given invalid email format', function () {
    const wrapper = shallow(<Login />)
    const loginButton = wrapper.find('form button.btn-lg.btn-primary')
    wrapper.setState({
      email: '123',
      password: '123',
    })

    loginButton.simulate('click')

    expect(postLogin).not.toBeCalled()
  })
})

describe('# Login request', () => {
  it.skip('should be send form when sign in button clicked', function () {
    const wrapper = shallow(<Login />)

    wrapper.find('form button.btn-lg.btn-primary').simulate('click')

    expect(postLogin).toBeCalled()
  })

  it.skip('can set error messages correctly when received error response', async function () {
    (postLogin as jest.Mock).mockImplementation(() => Promise.reject({
      errors: { 'email and password': [ 'is invalid' ] },
    }))
    const wrapper = shallow(<Login />)

    wrapper.find('form button.btn-lg.btn-primary').simulate('click')

    expect(postLogin).toBeCalled()
    expect(wrapper.find('.error-messages')).toHaveLength(1)
    expect(wrapper.find('.error-messages').text()).toContain('password is invalid')
  })

  it.skip('should be show error message when given response error', function () {
    (postLogin as jest.Mock).mockImplementation(() => Promise.reject({
      errors: { 'email and password': [ 'is invalid' ] },
    }))
    const wrapper = shallow(<Login />)
    wrapper.setState({
      errors: {
        'password': [ 'is invalid' ],
      },
    })
    wrapper.update()

    expect(wrapper.find('.error-messages')).toHaveLength(1)
    expect(wrapper.find('.error-messages').text()).toContain('password is invalid')
  })

  it.skip('should be show multiple errors when given multiple response errors', function () {
    const wrapper = shallow(<Login />)
    wrapper.setState({
      errors: {
        'email': [ 'is already exists' ],
        'password': [ 'is too long' ],
      },
    })
    wrapper.update()

    expect(wrapper.find('.error-messages > li')).toHaveLength(2)
  })

  it.skip('should not be send when given invalid form', function () {
    const wrapper = shallow(<Login />)
    wrapper.setState({
      email: '123',
      password: '123',
    })
    wrapper.update()
    const loginButton = wrapper.find('form button.btn-lg.btn-primary')

    loginButton.simulate('click')

    expect(postLogin).not.toBeCalled()
  })

  it.skip('should can goto home page when entering the correct account', async function () {

    (postLogin as jest.Mock).mockResolvedValue({ token: 'foobar' })
    const wrapper = shallow(<Login />)
    wrapper.setState({
      email: 'test@example.com',
      password: '123456',
    })

    // await instance.onLogin()

    expect(route).toBeCalledWith('/')
  })

  it.skip('should save token locally when login successful', async function () {
    (postLogin as jest.Mock<Promise<UserWithToken>>).mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      username: 'test',
      bio: null,
      image: null,
      token: 'foobar',
    })
    jest.spyOn(window.localStorage, 'setItem')
    const wrapper = shallow(<Login />)
    wrapper.setState({
      email: 'test@example.com',
      password: '123456',
    })

    // await instance.onLogin()

    expect(window.localStorage.setItem).toBeCalledWith('token', 'foobar')
  })
})

