import Structure from './structure/Structure';

const structure = new Structure<string | number>(['name', 'lastName', 'age']);

structure.name = 'Jack';
structure.lastName = 'Black';
structure.age = '53';

console.log(structure.name);
console.log(structure.lastName);
console.log(structure.age);
