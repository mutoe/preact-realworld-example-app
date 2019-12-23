import reducer from '../reducer'
import { CLEAN_ERRORS, UPDATE_USER, SET_ERRORS } from '../constants'

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

  it('should set localstorage item when login triggered', function () {
    jest.spyOn(global.localStorage, 'setItem')
    const rootState = reducer(initState, { type: UPDATE_USER, payload: { token: 'foobar' } })

    expect(rootState).toMatchObject({ user: { token: 'foobar' } })
    expect(global.localStorage.setItem).toBeCalledWith('user', JSON.stringify(rootState.user))
  })

  it('should clear localstorage user item when logout triggered', function () {
    jest.spyOn(global.localStorage, 'removeItem')
    const rootState = reducer(initState, { type: UPDATE_USER, payload: null })

    expect(rootState).toMatchObject({ user: null })
    expect(global.localStorage.removeItem).toBeCalledWith('user')
  })
})
