import { postLogin, PostLoginForm } from '../services'
import { UPDATE_USER, SET_ERRORS } from './constants'

export const login = async (form: PostLoginForm) => {
  try {
    const user = await postLogin(form)
    return {
      type: UPDATE_USER,
      payload: user,
    }
  } catch (e) {
    return {
      type: SET_ERRORS,
      payload: e.errors,
    }
  }
}
