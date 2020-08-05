const glob = require('glob');
const minimatch = require('minimatch');
const Glob = glob.Glob;
const assert = require('assert');

assert.ok(minimatch('a.txt', '?.txt'));

assert.ok(minimatch('ab.txt', '??.txt'));
