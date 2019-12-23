import { shallow } from 'enzyme'
import { h } from 'preact'
import Settings from '../Settings'
import { useRootState } from '../../store'
import { LOGOUT } from '../../store/constants'
import { route } from 'preact-router'

jest.mock('../../store')
jest.mock('preact-router')

const useRootStateMock = useRootState as jest.Mock

beforeEach(() => {
  useRootStateMock.mockReturnValue([ { user: {} }, jest.fn() ])
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('# Settings page', function () {
  it('should dispatch LOGOUT action when logout button clicked', function () {
    const dispatch = jest.fn()
    useRootStateMock.mockReturnValue([ { user: {} }, dispatch ])
    const wrapper = shallow(<Settings />)

    wrapper.find('button.btn-outline-danger').simulate('click')

    expect(dispatch).toBeCalledWith({ type: LOGOUT })
  })

  it('should jump to login page after logout or unauthorized', function () {
    useRootStateMock.mockReturnValue([ { user: null }, jest.fn() ])
    shallow(<Settings />)

    expect(route).toBeCalledTimes(1)
    expect(route).toBeCalledWith('/login')
  })
})
