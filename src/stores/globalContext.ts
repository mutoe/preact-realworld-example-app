import { createContext } from 'preact'

export const initialRootState: RootState = {
  user: null
}

const RootStateContext = createContext<RootState>(initialRootState)

export default RootStateContext
