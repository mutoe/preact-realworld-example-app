<<<<<<< HEAD:test/utils/parse-storage-get.spec.ts
import parseStorageGet from '../../src/utils/parse-storage-get'
=======
import parseStorageGet from '../parse-storage-get';
>>>>>>> 2b7be12 (style: Switching to Preact code style):src/utils/__test__/parse-storage-get.spec.ts

describe('# parse storage get', () => {
  it('should get an object given valid local storage item', () => {
    jest.spyOn(global.localStorage, 'getItem').mockReturnValue(JSON.stringify({ foo: 'bar' }));

    expect(() => {
      const result = parseStorageGet('key');
      expect(result).toMatchObject({ foo: 'bar' });
    }).not.toThrow();
  });

  it('should get null given invalid storage item', () => {
    jest.spyOn(global.localStorage, 'getItem').mockReturnValue('bar');

    expect(() => {
      const result = parseStorageGet('key');
      expect(result).toBeNull();
    }).not.toThrow();
  });
});
