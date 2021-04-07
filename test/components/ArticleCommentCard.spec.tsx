import { h } from 'preact';
import { fireEvent, render, screen, waitFor } from '@testing-library/preact';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import ArticleCommentCard from '../../src/components/ArticleCommentCard';
import useStore from '../../src/store';

jest.mock('../../src/store', () => jest.fn());

const comment: ArticleComment = {
	id: 1,
	body: 'foo',
	createdAt: '2009-02-19T00:00:00.000Z',
	updatedAt: '2008-05-19T00:00:00.000Z',
	author: {
		username: 'SmokeTest',
		following: false
	}
};

const articleSlug = '/foo';

test('should render correctly', () => {
	const { asFragment } = render(
		<ArticleCommentCard articleSlug={articleSlug} comment={comment} onDelete={jest.fn()} />
	);

	expect(asFragment()).toMatchSnapshot();
});

test("should not display trash icon in other's comment", async () => {
	((useStore as unknown) as jest.Mock).mockReturnValue({ username: 'SmokeTest' });
	render(<ArticleCommentCard articleSlug={articleSlug} comment={comment} onDelete={jest.fn()} />);

	expect(screen.getByLabelText('Delete comment')).toBeInTheDocument();
});

test('should delete comment when trash icon clicked', () => {
	const server = setupServer(
		rest.post(
			`https://conduit.productionready.io/api/articles/${articleSlug}/comments/${comment.id}`,
			(_req, res, ctx) => {
				return res(ctx.status(200));
			}
		)
	);
	server.listen();
	((useStore as unknown) as jest.Mock).mockReturnValue({ username: 'SmokeTest' });

	const onDelete = jest.fn();
	render(<ArticleCommentCard articleSlug={articleSlug} comment={comment} onDelete={onDelete} />);

	fireEvent.click(screen.getByLabelText('Delete comment'));
	waitFor(() => expect(onDelete).toHaveBeenCalled());

	server.close();
});
