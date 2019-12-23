import { CLEAN_ERRORS, SET_ERRORS, UPDATE_USER } from './constants'

const reducer = (state: RootState, action: Action): RootState => {
  switch (action.type) {
  case SET_ERRORS: {
    return { ...state, errors: action.payload }
  }
  case CLEAN_ERRORS: {
    return { ...state, errors: {} }
  }

  case UPDATE_USER: {
    const user = action.payload || null
    if (user) {
      global.localStorage.setItem('user', JSON.stringify(user))
    } else {
      global.localStorage.removeItem('user')
    }
    return { ...state, user }
  }

  default:
    return state
  }
}

export default reducer
