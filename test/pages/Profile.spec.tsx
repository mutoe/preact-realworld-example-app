import { h } from 'preact';
import { cleanup, render, screen } from '@testing-library/preact';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import Profile from '../../public/pages/Profile';
import useStore from '../../public/store';

jest.mock('../../public/store', () => jest.fn());

const profile: Profile = {
	username: 'SmokeTest',
	following: false,
};

const profile2: Profile = {
	username: 'SmokeTest2',
	following: true,
};

const server = setupServer(
	rest.get(
		`https://conduit.productionready.io/api/profiles/${profile.username}`,
		(_req, res, ctx) => {
			return res(
				ctx.status(200),
				ctx.json({
					profile,
				})
			);
		}
	),
	rest.get(
		`https://conduit.productionready.io/api/profiles/${profile2.username}`,
		(_req, res, ctx) => {
			return res(
				ctx.status(200),
				ctx.json({
					profile: profile2,
				})
			);
		}
	)
);

beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Profile Page Renders', () => {
	it('should render the header correctly', () => {
		render(<Profile username={`@${profile.username}`} />);

		expect(screen.getByRole('img')).toHaveAttribute('src', 'https://static.productionready.io/images/smiley-cyrus.jpg');
		expect(screen.getByRole('heading', { name: profile.username })).toBeInTheDocument();
	});

	it('should render the follow button correctly', async () => {
		render(<Profile username={`@${profile.username}`} />);

		expect(screen.getByRole('button', { name: `Follow ${profile.username}` })).toBeInTheDocument();

		cleanup();

		render(<Profile username={`@${profile2.username}`} />);

		await screen.findByRole('button', { name: `Unfollow ${profile2.username}` });
		expect(screen.getByRole('button', { name: `Unfollow ${profile2.username}` })).toBeInTheDocument();
	});

	it('should render the tabs/links correctly', () => {
		((useStore as unknown) as jest.Mock).mockReturnValue('');
		render(<Profile username={`@${profile.username}`} />);

		expect(screen.getByRole('link', { name: 'My Articles' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Favorited Articles' })).toBeInTheDocument();
	});

	it('should render header for own profile correctly', () => {
		((useStore as unknown) as jest.Mock).mockReturnValue('SmokeTest');

		render(<Profile username={`@${profile.username}`} />);

		expect(screen.getByRole('img')).toHaveAttribute('src', 'https://static.productionready.io/images/smiley-cyrus.jpg');
		expect(screen.getByRole('heading', { name: profile.username })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Edit Profile Settings' })).toBeInTheDocument();
	});
});

//test('should request articles that about profile', () => {
//	shallow(<Profile username="foo" />);
//
//	expect(getProfileArticles).toBeCalledTimes(1);
//	expect(getProfileArticles).toBeCalledWith('foo', 1);
//});
//
//test('should display article preview after articles got', async () => {
//	const articles = generateArticles(2);
//	getProfileArticlesMock.mockResolvedValue({ articles, articlesCount: 2 });
//	const wrapper = shallow(<Profile username="@foo" />);
//	await new Promise(r => setImmediate(r));
//
//	expect(wrapper.find(ArticlePreview)).toHaveLength(2);
//});

//describe('# Follow user', () => {
//	test('should display Follow when user is not following', async () => {
//		const user = generateProfile();
//		user.following = false;
//		getProfileMock.mockResolvedValue(user);
//		const wrapper = shallow(<Profile username={`@${user.username}`} />);
//		await new Promise(r => setImmediate(r));
//		wrapper.update();
//
//		expect(wrapper.find('.user-info button').text()).toContain('Follow');
//	});
//
//	test('should display Unfollow when user is following', async () => {
//		const user = generateProfile();
//		user.following = true;
//		getProfileMock.mockResolvedValue(user);
//		const wrapper = shallow(<Profile username={`@${user.username}`} />);
//		await new Promise(r => setImmediate(r));
//		wrapper.update();
//
//		expect(wrapper.find('.user-info button').text()).toContain('Unfollow');
//	});
//
//	test('should send follow request when Follow button clicked', async () => {
//		const user = generateProfile();
//		getProfileMock.mockResolvedValue({ ...user, following: false });
//		const wrapper = shallow(<Profile username={`@${user.username}`} />);
//		await new Promise(r => setImmediate(r));
//
//		const postFollowProfileMock = postFollowProfile as jest.Mock<Promise<Profile>>;
//		postFollowProfileMock.mockImplementation();
//		wrapper.find('.user-info button').simulate('click');
//
//		expect(postFollowProfileMock).toBeCalledTimes(1);
//	});
//
//	test('should send unfollow request when Unfollow button clicked', async () => {
//		const user = generateProfile();
//		getProfileMock.mockResolvedValue({ ...user, following: true });
//		const wrapper = shallow(<Profile username={`@${user.username}`} />);
//		await new Promise(r => setImmediate(r));
//
//		const deleteFollowProfileMock = deleteFollowProfile as jest.Mock<Promise<Profile>>;
//		deleteFollowProfileMock.mockImplementation();
//		wrapper.find('.user-info button').simulate('click');
//
//		expect(deleteFollowProfileMock).toBeCalledTimes(1);
//	});
//
//});
