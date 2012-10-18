node-epsg
=========

A node module with all epsg definitions for proj4js

created with [this scraper](https://gist.github.com/3909376)

see epsg.js for a list of supported projections

Requirements
========
[proj4js](http://trac.osgeo.org/proj4js/)


Usage
========

    var proj4 = require('proj4js');
    require('epsg')(proj4);
    
    // check out all your new defs!
    console.log(proj4.defs);

