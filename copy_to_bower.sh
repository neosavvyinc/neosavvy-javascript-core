#!/bin/bash
cp target/*.js ../bower-neosavvy-javascript-core/
cp bower.json ../bower-neosavvy-javascript-core/
sed -i.bak "s/neosavvy-javascript-core-development/neosavvy-javascript-core/g" ../bower-neosavvy-javascript-core/bower.json
rm ../bower-neosavvy-javascript-core/bower.json.bak