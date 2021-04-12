import { dateFormatter } from '../../public/utils/dateFormatter';

test('should format date correctly', () => {
	const dateString = '2021-04-03T04:10:59.616Z';

	expect(dateFormatter(dateString)).toMatchInlineSnapshot('"April 3, 2021"');
});
