// TypeScript keyof、typeof和const assertion：http://www.semlinker.com/ts-typeof/

const CONFIG_KEYS = ['name', 'school', 'country'];

type KEY_TYPES = typeof CONFIG_KEYS;

type KEY_TYPE = typeof CONFIG_KEYS[number];

//////////////////

const CONST_CONFIG_KEYS = ['name', 'school', 'country'] as const;

type COPNST_KEY_TYPES = typeof CONST_CONFIG_KEYS;

type CONST_KEY_TYPE = typeof CONST_CONFIG_KEYS[number];

///////

const obj = {
    text: 'hello',
} as const;

let b = Math.random() < 0.5 ? 0 : 1;

let arr = [1, 2, 3, 4];

let foo = {
    name: 'foo',
    contents: arr,
} as const;

foo.contents.push();
