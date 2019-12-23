import render from 'preact-render-to-string'
import Pagination from '../Pagination'
import { h } from 'preact'

describe('# Pagination Component', function () {
  it('should display normally', function () {
    const html = render(<Pagination />)

    expect(html).toMatchSnapshot()
  })
})
