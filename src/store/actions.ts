import { postLogin, PostLoginForm } from '../services'
import { SET_ERRORS, UPDATE_USER } from './constants'

export const login = async (form: PostLoginForm): Promise<Action> => {
  try {
    const user = await postLogin(form)
    return {
      type: UPDATE_USER,
      user,
    }
  } catch (e) {
    return {
      type: SET_ERRORS,
      errors: e.errors,
    }
  }
}
