import { postLogin } from '../../services'
import { login } from '../actions'
import { SET_ERRORS, UPDATE_USER } from '../constants'

jest.mock('../../services')

const postLoginMock = postLogin as jest.Mock

describe('# Actions', function () {
  it('should be trigger LOGIN reducer after login success', async function () {
    postLoginMock.mockResolvedValue({})

    const action = await login({ email: 'test@example.com', password: '12345678' })

    expect(action).toMatchObject({ type: UPDATE_USER })
  })

  it('should be trigger SET_ERRORS action after login failed with error message', async function () {
    const errors = {
      password: ['is valid'],
    }
    postLoginMock.mockRejectedValue({ errors })

    const action = await login({ email: 'test@example.com', password: '' })

    expect(action).toMatchObject({ type: SET_ERRORS, errors })
  })
})
