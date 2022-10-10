import Structure from '../src/structure/Structure';

const createStructure = (): Structure<string | number> => {
  const struct = new Structure<string | number>(['name', 'age']);
  struct.name = 'Alex';
  struct.age = 34;
  return struct;
};

describe('test Structure<string | number>', () => {
  const struct = createStructure();

  it('create Structure', () => {
    expect(new Structure(['key'])).toBeInstanceOf(Structure);
  });

  it('Get string value', () => {
    expect(struct.name).toBe('Alex');
  });

  it('Get number value', () => {
    expect(struct.age).toBe(34);
  });

  it('Update value', () => {
    struct.age = 50;
    expect(struct.age).toBe(34);
  });
});
