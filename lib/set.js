var util = require('util'),
	events = require('events');

function Set(elements) {
	this._map = {};
	this._elements = [];

	if(elements === undefined) {
		elements = [];
	}

	if(!(elements instanceof Array)) {
		elements = [elements];
	}

	for(var i = 0; i < elements.length; i++) {
		if(!this.contains(elements[i])) {
			this._elements.push(elements[i]);
			this._map[JSON.stringify(elements[i])] = this._elements.length - 1;
		}
	}
}

util.inherits(Set, events.EventEmitter);

Object.defineProperty(Set.prototype, 'elements', {
	get: function() {
		return this._elements;
	}
});

Object.defineProperty(Set.prototype, 'length', {
	get: function() {
		return this.elements.length;
	}
});

Set.prototype._copy = function(elements) {
	var copy = new Set(elements);
	copy._events = util._extend({}, this._events); // copy events
	return copy;
};

Set.prototype._indexOf = function(element) {
	return this._map[JSON.stringify(element)];
};

Set.prototype.add = function(element) {
	if(!this.contains(element)) {
		this.emit('add', element);
		return this._copy(this.elements.concat([element]));
	} else {
		return this;
	}
};

Set.prototype.remove = function(element) {
	var index = this._indexOf(element);
	if(index !== undefined) {
		this.emit('remove', element);
		var elements = this.elements.slice();
		elements.splice(index, 1);
		return this._copy(elements);
	} else {
		return this;
	}
};

Set.prototype.contains = function(element) {
	return this._map[JSON.stringify(element)] !== undefined;
};

Set.prototype.intersect = function(set) {
	return this.filter(function(element) {
		return set.contains(element);
	});
};

Set.prototype.difference = function(set) {
	return this.filter(function(element) {
		return !set.contains(element);
	});
};

Set.prototype.union = function(set) {
	return this._copy(this.elements.concat(set._elements));
};

Set.prototype.map = function(fn) {
	var elements = [];
	for(var i = 0; i < this.elements.length; i++) {
		elements.push(fn(this.elements[i]));
	}

	return this._copy(elements);
};

Set.prototype.filter = function(fn) {
	var elements = [];
	for(var i = 0; i < this.elements.length; i++) {
		if(fn(this.elements[i])) {
			elements.push(this.elements[i]);
		}
	}

	return this._copy(elements);
};

Set.prototype.reduce = function(fn, acc) {
	for(var i = 0; i < this.elements.length; i++) {
		acc = fn(acc, this.elements[i]);
	}

	return acc;
};

module.exports = Set;