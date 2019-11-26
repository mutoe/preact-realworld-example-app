import { shallow } from 'enzyme'
import { h } from 'preact'
import Login from '../Login'
import { postLogin } from '../../services'
import {route} from 'preact-router'

jest.mock('../../services')
jest.mock('preact-router')

let wrapper = shallow<Login>(<Login />)
let instance = wrapper.instance()

beforeEach(() => {
  jest.resetAllMocks()
  wrapper = shallow(<Login />)
  instance = wrapper.instance()
})

describe('# Login error message', () => {
  it('should be show error message when given response error', function () {
    wrapper.setState({
      errors: {
        'password': [ 'is invalid' ],
      },
    })
    wrapper.update()

    expect(wrapper.find('.error-messages')).toHaveLength(1)
    expect(wrapper.find('.error-messages').text()).toContain('password is invalid')
  })

  it('should be show multiple errors when given multiple response errors', function () {

    wrapper.setState({
      errors: {
        'email': [ 'is already exists' ],
        'password': [ 'is too long' ],
      },
    })
    wrapper.update()

    expect(wrapper.find('.error-messages > li')).toHaveLength(2)
  })
})

describe('# Login form validate', () => {
  it('should set button disabled when submit a empty form field', function () {
    const loginButton = wrapper.find('form button.btn-lg.btn-primary')
    wrapper.setState({
      email: '123',
      password: '',
    })

    wrapper.update()

    expect(loginButton.props().disabled).toBe(true)
  })
})

describe('# Login request', () => {
  it('should be send form when sign in button clicked', function () {
    instance.onLogin = jest.fn()
    instance.forceUpdate()
    const loginButton = wrapper.find('form button.btn-lg.btn-primary')

    loginButton.simulate('click')

    expect(instance.onLogin).toBeCalled()
  })

  it('can set error messages correctly when received error response', async function () {
    (postLogin as jest.Mock).mockImplementation(() => Promise.reject({
      errors: { 'email and password': [ 'is invalid' ], }
    }))
    wrapper.setState({
      email: 'bad_account@example.com',
      password: '123456',
    })

    await instance.onLogin()

    expect(postLogin).toBeCalled()
    expect(wrapper.state().errors).toHaveProperty('email and password')
  })

  it('should not be send when given invalid form', function () {
    wrapper.setState({
      email: '123',
      password: '123',
    })
    wrapper.update()
    const loginButton = wrapper.find('form button.btn-lg.btn-primary')

    loginButton.simulate('click')

    expect(postLogin).not.toBeCalled()
  })

  it('should can goto home page when entering the correct account', async function () {
    (postLogin as jest.Mock).mockImplementation(() => Promise.resolve())
    wrapper.setState({
      email: 'test@example.com',
      password: '123456'
    })

    await instance.onLogin()

    expect(route).toBeCalledWith('/')
  })
})

