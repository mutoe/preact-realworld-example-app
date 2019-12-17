import { shallow } from 'enzyme'
import { h } from 'preact'
import { postRegister } from '../../services'
import Register from '../Register'

jest.mock('../../services')
jest.mock('preact-router')

const postRegisterMock = postRegister as jest.Mock

afterEach(() => {
  jest.clearAllMocks()
})

describe('# Register error message', () => {
  it('should be show error message when given response error', async function () {
    postRegisterMock.mockRejectedValue({
      errors: {
        'password': [ 'is invalid' ],
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
        'email': [ 'is already exists' ],
        'password': [ 'is too long' ],
      },
    })
    const wrapper = shallow(<Register />)
    wrapper.find('form button.btn-lg.btn-primary').simulate('click')
    await new Promise(r => setImmediate(r))

    expect(wrapper.find('.error-messages > li')).toHaveLength(2)
  })
})

// describe('# Register form validate', () => {
//   it('should set button disabled when submit a empty form field', function () {
//     const wrapper = shallow(<Register />)
//     const loginButton = wrapper.find('form button.btn-lg.btn-primary')
//     console.log(wrapper.find('input[type="email"]').renderProp)
//     wrapper.find('input[type="email"]').getDOMNode<HTMLInputElement>().value = '123'
//
//     expect(loginButton.props().disabled).toBe(true)
//   })
// })

// describe('# Register request', () => {
//   it('should be send form when sign in button clicked', function () {
//     const wrapper = shallow(<Register />)
//     instance.onRegister = jest.fn()
//     instance.forceUpdate()
//     const loginButton = wrapper.find('form button.btn-lg.btn-primary')
//
//     loginButton.simulate('click')
//
//     expect(instance.onRegister).toBeCalled()
//   })
//
//   it('can set error messages correctly when received error response', async function () {
//     postRegisterMock.mockImplementation(() => Promise.reject({
//       errors: { 'email and password': [ 'is invalid' ] },
//     }))
//     wrapper.setState({
//       email: 'bad_account@example.com',
//       password: '123456',
//     })
//
//     await instance.onRegister()
//
//     expect(postRegister).toBeCalled()
//     expect(wrapper.state().errors).toHaveProperty('email and password')
//   })
//
//   it('should not be send when given invalid form', function () {
//     wrapper.setState({
//       username: '123',
//       email: '123',
//       password: '123',
//     })
//     wrapper.update()
//     const registerButton = wrapper.find('form button.btn-lg.btn-primary')
//
//     registerButton.simulate('click')
//
//     expect(postRegister).not.toBeCalled()
//   })
//
//   it('should can goto home page when entering the correct account', async function () {
//     postRegisterMock.mockImplementation(() => Promise.resolve({ token: 'foobar' }))
//     wrapper.setState({
//       username: 'test_user',
//       email: 'test@example.com',
//       password: '123456',
//     })
//
//     await instance.onRegister()
//
//     expect(route).toBeCalledWith('/')
//   })
//
//   it('should save token locally when register successful', async function () {
//     (postRegister as jest.Mock<Promise<UserWithToken>>).mockResolvedValue({
//       id: 1,
//       email: 'test@example.com',
//       username: 'test',
//       bio: null,
//       image: null,
//       token: 'foobar',
//     })
//     jest.spyOn(window.localStorage, 'setItem')
//     wrapper.setState({
//       email: 'test@example.com',
//       password: '123456',
//     })
//
//     await instance.onRegister()
//
//     expect(window.localStorage.setItem).toBeCalledWith('token', 'foobar')
//   })
// })
//
