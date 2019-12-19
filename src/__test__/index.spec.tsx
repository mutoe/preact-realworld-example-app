import { route } from 'preact-router'
import { h, render } from 'preact'
import { unmountComponentAtNode } from 'preact/compat'
import App from '../App'

jest.mock('preact-router')

describe('# Root Component', function () {
  it('renders without crashing', function () {
    expect(() => {
      const div = document.createElement('div')
      render(<App />, div)
      unmountComponentAtNode(div)
    }).not.toThrow()
  })

  it.skip('should be jump Login page when request 401 code got', async function () {
    // TODO: implement request interceptors
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // (request.interceptors.response as any).handlers[0].rejected({
    //   response: { status: 401 },
    // })

    expect(route).toBeCalledTimes(1)
    expect(route).toBeCalledWith('/login')
  })

})
