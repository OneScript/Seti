# Onescript\Seti
Immutable set data structure for Node.js.

## Overview
- Collection which store only unique elements.
- Every change create new set to avoid mutable state.

## Install
Install package throungh npm:
Load package with RequireJS
```
npm install -g seti
```

## Usage
Load package with RequireJS:
```javascript
var Seti = require('seti');
```

### Set(elements)
Create new set.
#### One element:
```javascript
var set = new Seti('foo');
```

#### More elements:
```javascript
var set = new Seti(['foo', 'bar']);
```

### Seti.elements
Elements in set.

```javascript
new Seti(['foo', 'bar', 'foo']).elements; // ['foo', 'bar']
```

### Seti.lenght
Number of elements.

```javascript
new Seti(['foo', 'bar', 'foo']).lenght; // 2
```

### Seti.add(element)
Add element to set.

```javascript
New Seti('foo').add('bar').elements;  // ['foo', 'bar']
```

### Seti.remove(element)
Remove element from set.

```javascript
New Seti(['foo', 'bar']).remove('bar').elements;  // ['foo']
```

### Seti.contains(element)
Check for element existence in set.

```javascript
New Seti(['foo', 'bar']).contains('bar').elements;  // True
```

### Seti.union(set)
Concat two sets.

```javascript
New Seti(['foo', 'bar']).union(new Set(['foo', 'baz']).elements;  // ['foo', 'bar', 'baz']
```

### Seti.intersect(set)
Same elements from two sets.

```javascript
New Seti(['foo', 'bar']).intersect(new Set(['foo', 'baz']).elements;  // ['foo']
```

### Seti.difference(set)
Different elements from set against set.

```javascript
New Seti(['foo', 'bar']).difference(new Set(['foo', 'baz']).elements;  // ['bar']
```

### Seti.filter(fn(element))
Filter set on given predicate.

```javascript
New Seti([1, 2, 3, 4]).filter(function(element) {
    return element % 2 === 0;
}).elements;  // [2, 4]
```

### Seti.map(fn(element))
Map set on given predicate.

```javascript
New Seti([1, 2, 3, 4]).map(function(element) {
    return i * i;
}).elements;  // [1, 4, 9, 16]
```

### Seti.reduce(fn(accumulator, element), accumulator)
Reduce set to one value.

```javascript
New Seti([1, 2, 3, 4]).reduce(function(acc, element) {
    return acc + element;
}).elements;  // 10
```
