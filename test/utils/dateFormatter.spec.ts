import { test } from 'uvu';
import { equal } from 'uvu/assert';
import { dateFormatter } from '../../public/utils/dateFormatter';

test('should format date correctly', () => {
	const dateString = '2021-04-03T04:10:59.616Z';

	equal(dateFormatter(dateString), 'April 3, 2021');
});

test.run();
