import { CLEAN_ERRORS, SET_ERRORS, UPDATE_USER } from './constants'
import { request } from '../services'

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
      // logout
        global.localStorage.removeItem('user')
        request.options.headers.Authorization = ''
        return { ...state, user: undefined }
      }

      // login
      user = Object.assign({}, state.user, user) as User
      global.localStorage.setItem('user', JSON.stringify(user))
      request.options.headers.Authorization = `Token ${user.token}`
      return { ...state, user }
    }

    default:
      return state
  }
}

export default reducer
