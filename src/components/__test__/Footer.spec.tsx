import render from 'preact-render-to-string'
import Footer from '../Footer'
import { h } from 'preact'

describe('# Footer', () => {
  it('should be display normally', function () {
    const html = render(<Footer />)

    expect(html).toMatchSnapshot()
  })
})
