import reducer from '../reducer'
import { CLEAN_ERRORS, SET_ERRORS, UPDATE_USER } from '../constants'

let initState: RootState

beforeEach(() => {
  initState = { user: undefined, errors: {} }
})

afterEach(() => {
  jest.resetAllMocks()
})

describe('# Reducer', function () {
  it('should return initState when nothing triggered', function () {
    const rootState = reducer(initState, { type: '' })

    expect(rootState).toMatchObject(initState)
  })

  it('should update error state when SET_ERRORS triggered', function () {
    const rootState = reducer(initState, { type: SET_ERRORS, errors: { foo: ['bar'] } })

    expect(rootState).toMatchObject({ errors: { foo: ['bar'] } })
  })

  it('should clear error state when CLEAR_ERRORS triggered', function () {
    const rootState = reducer(initState, { type: CLEAN_ERRORS })

    expect(rootState).toMatchObject({ errors: {} })
  })

  it('should set localstorage item when login triggered', function () {
    jest.spyOn(global.localStorage, 'setItem')
    const rootState = reducer(initState,
      { type: UPDATE_USER, user: { token: 'foobar' } as User })

    expect(rootState).toMatchObject({ user: { token: 'foobar' } })
    expect(global.localStorage.setItem).toBeCalledWith('user', JSON.stringify(rootState.user))
  })

  it('should clear localstorage user item when logout triggered', function () {
    jest.spyOn(global.localStorage, 'removeItem')
    const rootState = reducer(initState, { type: UPDATE_USER })

    expect(rootState).toMatchObject({ user: undefined })
    expect(global.localStorage.removeItem).toBeCalledWith('user')
  })
})
