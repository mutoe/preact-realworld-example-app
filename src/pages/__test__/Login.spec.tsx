import { h } from 'preact'
import Login from '../Login'
import { postLogin } from '../../services'
import { route } from 'preact-router'
import { mount } from 'enzyme'

jest.mock('../../services')
jest.mock('preact-router')

const postLoginMock = postLogin as jest.Mock

afterEach(() => {
  jest.clearAllMocks()
})

describe('# Login form validate', () => {
  it('should set button disabled when submit a empty form field', function () {
    const wrapper = mount(<Login />)
    wrapper.find('[placeholder="Email"]').getDOMNode<HTMLInputElement>().value = '123'

    const loginButton = wrapper.find('form button.btn-lg.btn-primary')
    expect(loginButton.props().disabled).toBe(true)
  })

  it('should not send form when given invalid email format', function () {
    const wrapper = mount(<Login />)
    const loginButton = wrapper.find('form button.btn-lg.btn-primary')
    wrapper.find('[placeholder="Email"]').getDOMNode<HTMLInputElement>().value = '123'
    wrapper.find('[placeholder="Password"]').getDOMNode<HTMLInputElement>().value = '123'

    loginButton.simulate('click')

    expect(postLogin).not.toBeCalled()
  })
})

describe('# Login request', () => {
  it('should be send form when sign in button clicked', async function () {
    const wrapper = mount(<Login />)
    wrapper.find('[placeholder="Email"]').getDOMNode<HTMLInputElement>().value = 'test@example.com'
    wrapper.find('[placeholder="Password"]').getDOMNode<HTMLInputElement>().value = '12345678'

    wrapper.find('form').simulate('submit')

    expect(postLogin).toBeCalledTimes(1)
  })

  it('can set error messages correctly when received error response', async function () {
    postLoginMock.mockRejectedValue({
      errors: {
        'email': [ 'is already exists' ],
        'password': [ 'is too long' ],
      },
    })
    const wrapper = mount(<Login />)
    wrapper.find('[placeholder="Email"]').getDOMNode<HTMLInputElement>().value = 'test@example.com'
    wrapper.find('[placeholder="Password"]').getDOMNode<HTMLInputElement>().value = '12345678'

    wrapper.find('form').simulate('submit')
    expect(postLogin).toBeCalledTimes(1)
    await new Promise(r => setImmediate(r))
    wrapper.update()

    expect(wrapper.find('.error-messages > li')).toHaveLength(2)
    expect(wrapper.find('.error-messages').text()).toContain('email is already exists')
    expect(wrapper.find('.error-messages').text()).toContain('password is too long')
  })

  it('should not be send when given invalid form', function () {
    const wrapper = mount(<Login />)
    wrapper.find('[placeholder="Email"]').getDOMNode<HTMLInputElement>().value = '123'
    wrapper.find('[placeholder="Password"]').getDOMNode<HTMLInputElement>().value = '12345678'
    wrapper.find('form').simulate('submit')

    expect(postLogin).not.toBeCalled()
  })

  it('should can goto home page when entering the correct account', async function () {
    postLoginMock.mockResolvedValue({ token: 'foobar' })
    const wrapper = mount(<Login />)
    wrapper.find('[placeholder="Email"]').getDOMNode<HTMLInputElement>().value = 'test@example.com'
    wrapper.find('[placeholder="Password"]').getDOMNode<HTMLInputElement>().value = '12345678'
    wrapper.find('form').simulate('submit')
    await new Promise(r => setImmediate(r))

    expect(route).toBeCalledWith('/')
  })

  it('should save token locally when login successful', async function () {
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
    wrapper.find('[placeholder="Email"]').getDOMNode<HTMLInputElement>().value = 'test@example.com'
    wrapper.find('[placeholder="Password"]').getDOMNode<HTMLInputElement>().value = '12345678'
    wrapper.find('form').simulate('submit')
    await new Promise(r => setImmediate(r))

    expect(global.localStorage.setItem).toBeCalledWith('user', JSON.stringify(result))
  })
})

