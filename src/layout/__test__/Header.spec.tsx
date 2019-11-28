import { h } from 'preact'
import { useContext } from 'preact/hooks'
import { initialRootState } from '../../stores/globalContext'
import Header from '../Header'
import render from 'preact-render-to-string'

jest.mock('preact/hooks', () => ({
  useContext: jest.fn(() => initialRootState),
}))

afterEach(() => {
  jest.resetAllMocks()
})

describe('# Header Component', () => {
  it('should hidden post and settings and display logging buttons when not logged', () => {
    (useContext as jest.Mock).mockReturnValue({
      user: null,
    })
    const html = render(<Header />)

    expect(html).toMatchSnapshot()
  })

  it('should display post and settings and hidden logging buttons when logged', () => {
    (useContext as jest.Mock).mockReturnValue({
      user: {},
    })
    const html = render(<Header />)

    expect(html).toMatchSnapshot()
  })
})
