import { h } from 'preact';
import { fireEvent, render, screen } from '@testing-library/preact';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import PopularTags from '../../src/components/PopularTags';

const onTagClick = jest.fn();

const server = setupServer(
	rest.get(
		'https://conduit.productionready.io/api/tags',
		(_req, res, ctx) => {
			return res(
				ctx.status(200),
				ctx.json({
					tags: [
						'foo',
						'bar',
						'baz'
					]
				})
			);
		}
	)
);

test('renders the PopularTags component', () => {
	render(<PopularTags onClick={onTagClick} />);
	expect(
		screen.getByText('Popular Tags')
	).toBeInTheDocument();
});

test('should set tag when tag clicked', async () => {
	server.listen();

	render(<PopularTags onClick={onTagClick} />);
	await screen.findByText('foo');

	fireEvent.click(screen.getByText('foo'));

	expect(onTagClick).toBeCalledWith('foo');

	server.close();
});

test('matches snapshot', async () => {
	server.listen();

	const { asFragment } = render(<PopularTags onClick={onTagClick} />);
	await screen.findByText('foo');

	expect(asFragment()).toMatchSnapshot();

	server.close();
});
