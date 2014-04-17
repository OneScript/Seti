var Set = require('../lib/set');
var assert = require('assert');

describe('#set', function() {
	it('should accept types', function() {
		assert.deepEqual(new Set().elements, []);
		assert.deepEqual(new Set([]).elements, []);
		assert.deepEqual(new Set(undefined).elements, []);
		assert.deepEqual(new Set([undefined]).elements, [undefined]);
		assert.deepEqual(new Set(null).elements, [null]);
		assert.deepEqual(new Set(1.5).elements, [1.5]);
		assert.deepEqual(new Set(true).elements, [true]);
		assert.deepEqual(new Set('').elements, ['']);
		assert.deepEqual(new Set(['foo', 'bar']).elements, ['foo', 'bar']);
		assert.deepEqual(new Set([['foo'], 'bar']).elements, [['foo'], 'bar']);
		assert.deepEqual(new Set({foo: 'bar'}).elements, [{foo: 'bar'}]);
	});

	it('should add element', function() {
		assert.deepEqual(new Set('foo').add('foo').elements, ['foo']);
		assert.deepEqual(new Set('foo').add('bar').elements, ['foo', 'bar']);
		assert.deepEqual(new Set({foo: 'bar'}).add({foo: 'bar'}).elements, [{foo: 'bar'}]);
		assert.deepEqual(new Set([['foo']]).add(['foo']).elements, [['foo']]);
	});

	it('should remove element', function() {
		assert.deepEqual(new Set().remove('foo').elements, []);
		assert.deepEqual(new Set('foo').remove('foo').elements, []);
		assert.deepEqual(new Set(['foo', 'bar']).remove('foo').elements, ['bar']);
		assert.deepEqual(new Set({foo: 'bar'}).remove({foo: 'bar'}).elements, []);
		assert.deepEqual(new Set([['foo']]).remove(['foo']).elements, []);
	});

	it('should check for element', function() {
		var set = new Set([1, true, 'foo', {foo: 'bar'}, ['foo', 'bar']]);
		assert.equal(set.contains(1), true);
		assert.equal(set.contains(0), false);
		assert.equal(set.contains(true), true);
		assert.equal(set.contains(false), false);
		assert.equal(set.contains('foo'), true);
		assert.equal(set.contains('bar'), false);
		assert.equal(set.contains({foo: 'bar'}), true);
		assert.equal(set.contains({bar: 'foo'}), false);
		assert.equal(set.contains(['foo', 'bar']), true);
		assert.equal(set.contains(['bar', 'foo']), false);
	});

	it('should intersect', function() {
		assert.deepEqual(new Set(['foo', 'bar', 'baz']).intersect(new Set(['foo', 'boo', 'baz'])).elements, ['foo', 'baz']);
	});

	it('should difference', function() {
		assert.deepEqual(new Set(['foo', 'bar', 'baz']).difference(new Set(['foo', 'boo'])).elements, ['bar', 'baz']);
	});

	it('should union', function() {
		assert.deepEqual(new Set(['foo', 'bar', 'baz']).union(new Set(['foo', 'boo'])).elements, ['foo', 'bar', 'baz', 'boo']);
	});

	// @todo Test events + events on copy
});