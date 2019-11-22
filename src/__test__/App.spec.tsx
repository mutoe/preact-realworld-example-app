import { h } from 'preact'
import { mount } from 'enzyme'

import App from '../App'

describe('# App', () => {
  it('should display initial count', () => {
    const wrapper = mount(<App name="hello" />)
    expect(wrapper.text()).toContain('props: hello')
  })

  it('should be rerendered after 2 seconds', function () {
    jest.useFakeTimers()
    const wrapper = mount(<App name="hello" />)

    jest.runOnlyPendingTimers()
    wrapper.update()

    expect(wrapper.text()).toContain('state: Preact')
  })
})
