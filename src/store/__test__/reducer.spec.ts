import reducer from '../reducer'
import { CLEAN_ERRORS, LOGIN, LOGOUT, SET_ERRORS } from '../constants'

let initState: RootState

beforeEach(() => {
  initState = { user: null, errors: {} }
})

describe('# Reducer', function () {
  it('should return initState when nothing triggered', function () {
    const rootState = reducer(initState, { type: 'nothing', payload: {} })

    expect(rootState).toMatchObject(initState)
  })

  it('should update error state when SET_ERRORS triggered', function () {
    const rootState = reducer(initState, { type: SET_ERRORS, payload: { foo: 'bar' } })

    expect(rootState).toMatchObject({ errors: { foo: 'bar' } })
  })

  it('should clear error state when CLEAR_ERRORS triggered', function () {
    const rootState = reducer(initState, { type: CLEAN_ERRORS, payload: {} })

    expect(rootState).toMatchObject({ errors: {} })
  })

  it('should set localstorage item when LOGIN triggered', function () {
    jest.spyOn(global.localStorage, 'setItem')
    const rootState = reducer(initState, { type: LOGIN, payload: { token: 'foobar' } })

    expect(rootState).toMatchObject({ user: { token: 'foobar' } })
    expect(global.localStorage.setItem).toBeCalledWith('user', JSON.stringify(rootState.user))
  })

  it('should clear localstorage user item when LOGOUT triggered', function () {
    jest.spyOn(global.localStorage, 'removeItem')
    const rootState = reducer(initState, { type: LOGOUT, payload: {} })

    expect(rootState).toMatchObject({ user: null })
    expect(global.localStorage.removeItem).toBeCalledWith('user')
  })
})
