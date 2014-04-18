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

	it('should map', function() {
		assert.deepEqual(new Set([1, 2, 3]).map(function(number) {
			return number * 3;
		}).elements, [3, 6, 9]);
	});

	it('should filter', function() {
		assert.deepEqual(new Set([0, 1, 2, 3, 4]).filter(function(number) {
			return number % 2 == 0;
		}).elements, [0, 2, 4]);
	});

	it('should reduce', function() {
		assert.equal(new Set([1, 2, 3, 4, 5, 6]).reduce(function(acc, number) {
			return acc + number;
		}, 0), 21);
	});

	it('should fire add event', function(done) {
		var set = new Set();

		var error = setTimeout(function() {
			assert.equal(false, 'add event not fired');
			done();
		}, 1000);

		set.on('add', function(element) {
			if(element === 'bar') {
				clearTimeout(error);
				done();
			}
		});

		var set2 = set.add('foo'); // create new copy

		set.on('add', function(element) {
			if(element === 'bar') {
				assert.equal(false, 'events are passed by reference');
			}
		});

		set2.add('bar');
	});

	it('should fire remove event', function(done) {
		var set = new Set(['foo', 'bar']);

		var error = setTimeout(function() {
			assert.equal(false, 'remove event not fired');
			done();
		}, 1000);

		set.on('remove', function(element) {
			if(element === 'bar') {
				clearTimeout(error);
				done();
			}
		});

		var set2 = set.remove('foo'); // create new copy

		set.on('remove', function(element) {
			if(element === 'bar') {
				assert.equal(false, 'events are passed by reference');
			}
		});

		set2.remove('bar');
	});
});