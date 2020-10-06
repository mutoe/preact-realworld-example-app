import { route } from 'preact-router'
import { h, render } from 'preact'
import { unmountComponentAtNode } from 'preact/compat'
import App from '../App'
import { request } from '../services'

jest.mock('preact-router')

describe('# Root Component', function () {
  it('renders without crashing', function () {
    expect(() => {
      const div = document.createElement('div')
      render(<App />, div)
      unmountComponentAtNode(div)
    }).not.toThrow()
  })

  it('should be jump Login page when request 401 code got', async function () {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 401,
      statusText: 'Unauthorized',
      async json () {
        return {}
      },
    })
    await expect(request.get('/')).rejects.toThrow('Unauthorized')

    expect(route).toBeCalledTimes(1)
    expect(route).toBeCalledWith('/login')
  })
})
