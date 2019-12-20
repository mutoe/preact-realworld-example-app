import { postLogin, PostLoginForm } from '../services'
import { LOGIN } from './constants'

export const login = async (form: PostLoginForm) => {
  return async (dispatch: (action: Action) => Promise<any>) => {
    const user = await postLogin(form)
    return {
      type: LOGIN,
      payload: user,
    }
  }
}
