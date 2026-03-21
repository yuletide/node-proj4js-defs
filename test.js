var assert = require('assert');

// Load the module
var epsg = require('./epsg');

// Test 1: module exports a function
assert.equal(typeof epsg, 'function', 'epsg module should export a function');

// Test 2: function adds EPSG definitions to a mock Proj4js object
var Proj4js = { defs: {} };
epsg(Proj4js);
var keys = Object.keys(Proj4js.defs);
assert(keys.length > 0, 'should have added EPSG definitions');
assert.equal(keys.length, 8498, 'should have exactly 8498 EPSG definitions, got ' + keys.length);
console.log('Loaded ' + keys.length + ' EPSG definitions');

// Test 3: check some well-known projections are present
assert(Proj4js.defs['EPSG:4326'], 'should have WGS84 (EPSG:4326)');
assert(Proj4js.defs['EPSG:900913'] || Proj4js.defs['EPSG:3857'], 'should have Web Mercator');

// Test 4: check that definition strings are non-empty proj4 strings
keys.forEach(function(key) {
  var def = Proj4js.defs[key];
  assert(typeof def === 'string' && def.length > 0, key + ' should have a non-empty definition');
  assert(def.indexOf('+proj=') !== -1 || def.indexOf('+init=') !== -1, key + ' should be a valid proj4 string');
});

// Test 5: verify EPSG keys follow expected format
keys.forEach(function(key) {
  assert(/^EPSG:\d+$/.test(key), 'key "' + key + '" should match EPSG:<number> format');
});

console.log('All tests passed!');
