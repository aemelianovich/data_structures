export default class Stucture<T> {
  #structure: T[];
  [key: string]: T;

  constructor(keys: string[]) {
    this.#structure = new Array(keys.length);

    for (let indx = 0; indx < keys.length; indx++) {
      Object.defineProperty(this, keys[indx], {
        enumerable: true,
        // accessor (getter), по сути это схар над самим методом
        get() {
          return this.#structure[indx];
        },
        set(v) {
          this.#structure[indx] = v;
        },
      });
    }
  }
}
