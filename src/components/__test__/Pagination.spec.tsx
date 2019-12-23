import render from 'preact-render-to-string'
import Pagination from '../Pagination'
import { h } from 'preact'
import { shallow } from 'enzyme'

describe('# Pagination Component', function () {
  it('should display normally', function () {
    const html = render(<Pagination count={1} currentPage={1} />)

    expect(html).toMatchSnapshot()
  })

  it('should display multiple items when count is passed in', function () {
    const wrapper = shallow(<Pagination count={50} currentPage={1} />)

    expect(wrapper.find('.page-item')).toHaveLength(5)
  })

  it('should highlight current page that is passed in props', function () {
    const wrapper = shallow(<Pagination count={50} currentPage={2} />)

    expect(wrapper.find('.page-item').at(1).hasClass('active')).toBeTruthy()
  })

})
