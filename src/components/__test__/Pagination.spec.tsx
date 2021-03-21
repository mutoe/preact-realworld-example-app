import render from 'preact-render-to-string'
import Pagination from '../Pagination'
import { h } from 'preact'
import { shallow } from 'enzyme'

describe('# Pagination Component', function () {
  const setPage = jest.fn()

  it('should display normally', function () {
    const html = render(<Pagination count={1} page={1} setPage={setPage} />)

    expect(html).toMatchSnapshot()
  })

  it('should display multiple items when count is passed in', function () {
    const wrapper = shallow(<Pagination count={50} page={1} setPage={setPage} />)

    expect(wrapper.find('.page-item')).toHaveLength(5)
  })

  it('should highlight current page that is passed in props', function () {
    const wrapper = shallow(<Pagination count={50} page={2} setPage={setPage} />)

    expect(wrapper.find('.page-item').at(1).hasClass('active')).toBeTruthy()
  })

  it('should can set current page when item clicked', function () {
    const wrapper = shallow(<Pagination count={50} page={1} setPage={setPage} />)

    wrapper.find('.page-item').at(1).find('a').simulate('click')

    expect(setPage).toBeCalledWith(2)
  })
})
