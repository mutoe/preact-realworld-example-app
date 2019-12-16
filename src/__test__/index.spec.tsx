import { axios } from '../services'
import { route } from 'preact-router'

jest.genMockFromModule('axios')
jest.mock('preact-router')

describe('# Root Component', function () {
  it('should be jump Login page when request 401 code got', async function () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (axios.interceptors.response as any).handlers[0].rejected({
      response: { status: 401 },
    })

    expect(route).toBeCalledTimes(1)
    expect(route).toBeCalledWith('/login')
  })

})
