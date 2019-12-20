import { CLEAN_ERRORS, LOGIN, LOGOUT, SET_ERRORS } from './constants'

const reducer = (state: RootState, action: Action): RootState => {
  switch (action.type) {
  case SET_ERRORS: {
    return { ...state, errors: action.payload }
  }
  case CLEAN_ERRORS: {
    return { ...state, errors: {} }
  }

  case LOGIN: {
    const user = action.payload
    global.localStorage.setItem('user', JSON.stringify(user))
    return { ...state, user }
  }

  case LOGOUT:
    global.localStorage.removeItem('user')
    return { ...state, user: null }

  default:
    return state
  }
}

export default reducer
