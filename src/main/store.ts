import Store from 'electron-store';

const store = new Store();

export const get = (key: string) => store.get(key);
export const set = (key: string, value: any) => store.set(key, value);
export const deleteKey = (key: string) => store.delete(key);

// store.set('unicorn', '🦄');
// console.log(store.get('unicorn'));
// //=> '🦄'

// // Use dot-notation to access nested properties
// store.set('foo.bar', true);
// console.log(store.get('foo'));
// //=> {bar: true}

// store.delete('unicorn');
// console.log(store.get('unicorn'));
// //=> undefined