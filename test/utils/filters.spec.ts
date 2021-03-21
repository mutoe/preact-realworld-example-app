<<<<<<< HEAD:test/utils/filters.spec.ts
import { dateFilter } from '../../src/utils/filters'
=======
import { dateFilter } from '../filters';
>>>>>>> 2b7be12 (style: Switching to Preact code style):src/utils/__test__/filters.spec.ts

describe('# Date filters', () => {
  it('should format date correctly', () => {
    const dateString = '2019-01-01 00:00:00';
    const result = dateFilter(dateString);

    expect(result).toMatchInlineSnapshot('"January 1"');
  });
});
