#!/bin/bash
set -e
set -u

echo "module.exports = function(Proj4js){" > epsg.js
psql -t -h localhost -U $USER --command "SELECT 'Proj4js.defs[\"EPSG:' || srid || '\"] = \"' || trim(proj4text) || '\";' from
spatial_ref_sys" >> epsg.js
echo "};" >> epsg.js