import { h } from 'preact';
import { fireEvent, render, screen } from '@testing-library/preact';

import Pagination from '../../src/components/Pagination';

const setPage = jest.fn();

test('renders the Pagination component', () => {
	const { asFragment } = render(<Pagination count={1} page={1} setPage={setPage} />);

	expect(asFragment()).toMatchSnapshot();
});

test('should display multiple items when count is passed in', () => {
	render(<Pagination count={50} page={1} setPage={setPage} />);

	expect(screen.getAllByRole('listitem')).toHaveLength(5);
});

test('should highlight current page that is passed in props', () => {
	render(<Pagination count={50} page={2} setPage={setPage} />);

	expect(screen.getAllByRole('listitem')[1]).toHaveClass('active');
});

test('should set current page when item clicked', () => {
	render(<Pagination count={50} page={1} setPage={setPage} />);

	fireEvent.click(screen.getByText('2'));

	expect(setPage).toBeCalledWith(2);
});
