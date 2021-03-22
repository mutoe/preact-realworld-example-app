import { h } from 'preact';
import render from 'preact-render-to-string';
import { shallow } from 'enzyme';

import Pagination from '../../src/components/Pagination';

describe('# Pagination Component', () => {
	const setPage = jest.fn();

	it('should display normally', () => {
		const html = render(<Pagination count={1} page={1} setPage={setPage} />);

		expect(html).toMatchSnapshot();
	});

	it('should display multiple items when count is passed in', () => {
		const wrapper = shallow(<Pagination count={50} page={1} setPage={setPage} />);

		expect(wrapper.find('.page-item')).toHaveLength(5);
	});

	it('should highlight current page that is passed in props', () => {
		const wrapper = shallow(<Pagination count={50} page={2} setPage={setPage} />);

		expect(wrapper.find('.page-item').at(1).hasClass('active')).toBeTruthy();
	});

	it('should can set current page when item clicked', () => {
		const wrapper = shallow(<Pagination count={50} page={1} setPage={setPage} />);

		wrapper.find('.page-item').at(1).find('a').simulate('click');

		expect(setPage).toBeCalledWith(2);
	});
});
