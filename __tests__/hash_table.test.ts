import { HashTable } from '../src/index';

describe('HashTable<string | number>', () => {
  it('create HashTable', () => {
    const hashTable = new HashTable<string | number>(33);
    expect(hashTable).toBeInstanceOf(HashTable);
  });

  it('Get undefined value', () => {
    const hashTable = new HashTable<string | number>(33);
    expect(hashTable.get(10)).toBe(undefined);
  });

  it('Set new values', () => {
    const hashTable = new HashTable<string | number>(3);

    hashTable.set('foo', 'bar');
    expect(hashTable.get('foo')).toBe('bar');

    hashTable.set(10, 20);
    expect(hashTable.get(10)).toBe(20);

    hashTable.set(11, 21);
    expect(hashTable.get(11)).toBe(21);

    hashTable.set(12, 22);
    expect(hashTable.get(12)).toBe(22);

    hashTable.set(13, 23);
    expect(hashTable.get(13)).toBe(23);

    hashTable.set('foo1', 'bar1');
    expect(hashTable.get('foo1')).toBe('bar1');

    hashTable.set('foo2', 'bar2');
    expect(hashTable.get('foo2')).toBe('bar2');

    hashTable.set('foo3', 'bar3');
    expect(hashTable.get('foo3')).toBe('bar3');

    hashTable.set('foo4', 'bar4');
    expect(hashTable.get('foo4')).toBe('bar4');
  });

  it('Set update values', () => {
    const hashTable = new HashTable<string | number>(3);

    hashTable.set('foo', 'bar');
    hashTable.set(10, 20);
    hashTable.set(11, 21);
    hashTable.set(12, 22);
    hashTable.set(13, 23);
    hashTable.set('foo1', 'bar1');
    hashTable.set('foo2', 'bar2');
    hashTable.set('foo3', 'bar3');
    hashTable.set('foo4', 'bar4');

    hashTable.set('foo', 'bar1');
    expect(hashTable.get('foo')).toBe('bar1');

    hashTable.set(10, 30);
    expect(hashTable.get(10)).toBe(30);

    hashTable.set(11, 31);
    expect(hashTable.get(11)).toBe(31);

    hashTable.set(12, 32);
    expect(hashTable.get(12)).toBe(32);

    hashTable.set(13, 33);
    expect(hashTable.get(13)).toBe(33);

    hashTable.set('foo1', 'bar11');
    expect(hashTable.get('foo1')).toBe('bar11');

    hashTable.set('foo2', 'bar22');
    expect(hashTable.get('foo2')).toBe('bar22');

    hashTable.set('foo3', 'bar33');
    expect(hashTable.get('foo3')).toBe('bar33');

    hashTable.set('foo4', 'bar44');
    expect(hashTable.get('foo4')).toBe('bar44');
  });

  it('Check keys iterator', () => {
    const hashTable = new HashTable<string | number>(3);

    hashTable.set(10, 20);
    hashTable.set(11, 21);
    hashTable.set(12, 22);
    hashTable.set(13, 23);
    hashTable.set('foo1', 'bar1');
    hashTable.set('foo2', 'bar2');
    hashTable.set('foo3', 'bar3');
    hashTable.set('foo4', 'bar4');

    const arr = [...hashTable.keys()].sort();
    expect(arr.join(',')).toBe(
      ['10', '11', '12', '13', 'foo1', 'foo2', 'foo3', 'foo4'].join(','),
    );
  });
});
