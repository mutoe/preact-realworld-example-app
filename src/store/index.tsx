import { createContext, h, VNode } from 'preact'
import parseStorageGet from '../utils/parse-storage-get'
import { useContext, useReducer } from 'preact/hooks'
import reducer from './reducer'

const initialRootState: RootState = {
  user: parseStorageGet('user') || null,
  errors: {},
}

type RootContextProps = [
  RootState,
  ({ type }: Action) => void
]

export const RootContext = createContext<RootContextProps>({} as RootContextProps)

export const RootProvider = (props: { children: VNode | VNode[] }) => {
  const value = useReducer(reducer, initialRootState)

  return (
    <RootContext.Provider value={value}>
      {props.children}
    </RootContext.Provider>
  )
}

export const useRootState = () => useContext(RootContext)
