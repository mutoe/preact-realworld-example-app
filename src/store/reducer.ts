import { CLEAN_ERRORS, SET_ERRORS, UPDATE_USER } from './constants'

const reducer = (state: RootState, action: Action): RootState => {
  switch (action.type) {
  case SET_ERRORS: {
    return { ...state, errors: action.errors }
  }
  case CLEAN_ERRORS: {
    return { ...state, errors: {} }
  }

  case UPDATE_USER: {
    let user = action.user
    if (!user) {
      global.localStorage.removeItem('user')
      return { ...state, user: undefined }
    }

    user = Object.assign({}, state.user, user) as UserWithToken
    global.localStorage.setItem('user', JSON.stringify(user))
    return { ...state, user }
  }

  default:
    return state
  }
}

export default reducer
