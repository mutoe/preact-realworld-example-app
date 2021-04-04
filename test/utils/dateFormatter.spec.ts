import { dateFormatter } from '../../src/utils/dateFormatter';

describe('# Date filters', () => {
	it('should format date correctly', () => {
		const dateString = '2021-04-03T21:16:46.779Z';

		expect(dateFormatter(dateString)).toMatchInlineSnapshot('"January 1"');
	});
});
