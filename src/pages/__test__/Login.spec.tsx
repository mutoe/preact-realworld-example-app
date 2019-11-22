import { mount } from 'enzyme'
import { h } from 'preact'

import Login from '../Login'

describe('# Login error message', () => {
  it('should be show error message when given response error', function () {
    const wrapper = mount(<Login />)

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
    const wrapper = mount(<Login />)

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
