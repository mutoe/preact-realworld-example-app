import { h } from 'preact';
import { render, screen, waitFor } from '@testing-library/preact';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import PopularTags from '../../src/components/PopularTags';

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
	render(<PopularTags onClick={(_stringParam) => void 0} />);
	expect(
		screen.getByText('Popular Tags')
	).toBeInTheDocument();
});

test('matches snapshot', async () => {
	server.listen();

	const { asFragment } = render(<PopularTags onClick={(_stringParam) => void 0} />);
	await waitFor(() => screen.getByText('foo'));

	expect(asFragment()).toMatchSnapshot();

	server.close();
});
