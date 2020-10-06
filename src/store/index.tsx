import { createContext, h, VNode } from 'preact'
import parseStorageGet from '../utils/parse-storage-get'
import { useContext, useEffect, useReducer } from 'preact/hooks'
import reducer from './reducer'
import { UPDATE_USER } from './constants'
import { request } from '../services'
import { route } from 'preact-router'

const initialRootState: RootState = {
  user: parseStorageGet('user') || null,
  errors: {},
}

type RootContextProps = [
  RootState,
  (action: Action) => void
]

export const RootContext = createContext<RootContextProps>({} as RootContextProps)

export const RootProvider = (props: { children: VNode | VNode[] }) => {
  const [state, dispatch] = useReducer(reducer, initialRootState)

  request.options.responseInterceptor = (response) => {
    if (response.status === 401) {
      dispatch({ type: UPDATE_USER })
      route('/login')
    }
  }

  useEffect(() => {
    dispatch({ type: UPDATE_USER, user: state.user })
  }, [])

  return (
    <RootContext.Provider value={[state, dispatch]}>
      {props.children}
    </RootContext.Provider>
  )
}

export const useRootState = () => useContext(RootContext)
