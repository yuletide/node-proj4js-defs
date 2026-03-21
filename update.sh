#!/bin/bash
set -e
set -u

tmpfile=$(mktemp epsg.js.XXXXXX)
trap 'rm -f "$tmpfile"' EXIT

echo "module.exports = function(Proj4js){" > "$tmpfile"
psql -t --no-align -h localhost -U "${PGUSER:-${USER:-$(whoami)}}" --command "SELECT ' Proj4js.defs[\"EPSG:' || srid || '\"] = \"' || trim(proj4text) || '\";' from spatial_ref_sys WHERE trim(proj4text) != '' ORDER BY srid" >> "$tmpfile"
echo "};" >> "$tmpfile"
mv "$tmpfile" epsg.js
trap - EXIT