javascript-core
===============

Neosavvy, Inc. core libraries for Javascript.

## Getting Started
Via bower,

    bower install Neosavvy-javascript-core

###Development Version,

Install all through npm,

    npm install

Install bower,

    sudo npm -g install bower

Install Grunt,

    sudo npm -g install grunt-cli

Scripts dependencies,

    bower install


To compile source code,

    grunt

To run unit tests while developing,

    grunt karma:unit

## Modules

```JavaScript
_ns.Core.Builders
_ns.Core.Utils
```

## _ns.Core.Builders

Nest collections into properties.

```JavaScript
new _ns.Core.Builders.CollectionBuilder(
    [{name: "Cheddar"}, {name: "Swiss"}, {name: "Pepperjack"}]
  ).nest('my.favorite.cheese').build()

[
  {"my":{"favorite":{"cheese":{"name":"Cheddar"}}}},
  {"my":{"favorite":{"cheese":{"name":"Swiss"}}}},
  {"my":{"favorite":{"cheese":{"name":"Pepperjack"}}}}
]
```

Build out service and parameterized urls.

```JavaScript
/* Required & Optional Params */

new _ns.Core.Builders.RequestUrlBuilder(
    "http://api.neosavvy.com/:user_id/clients/:company_id"
  )
  .paramReplace(":user_id", 150)
  .paramReplace(":company_id", 7)
  .addParam("page", 2)
  .build()

"http://api.neosavvy.com/150/clients/7?page=2"

/* Object Support */

new _ns.Core.Builders.RequestUrlBuilder(
    "http://api.neosavvy.com/:user_id/clients/:company_id"
  )
  .paramReplace({":user_id": 150, ":company_id", 7})
  .addParam({"page": 10, "device": "android"})
  .build()

"http://api.neosavvy.com/150/clients/7?page=2"

```

String operations.

```JavaScript
/* Camel To Dash */

new _ns.Core.Builders.StringBuilder(
    "myCamelCaseString"
  ).camelToDash().build()

"my-camel-case-string"


/* Constant Case To Dash */

new _ns.Core.Builders.StringBuilder(
    "MY_CONSTANT_CASE"
  ).constantToDash().build()

"my-constant-case"


/* Proper Case */
new _ns.Core.Builders.StringBuilder(
    "MY iNCorrect cAse"
  ).camelToDash().build()

"My Incorrect Case"
```

## _ns.Core.Utils

### BrowserUtils

Browser and user agent info.

```JavaScript
/* Full Info Hash */

_ns.Core.Utils.BrowserUtils.info()

{"browser":"chrome","browserVersion":"32.0.1700.107","os":"mac","osVersion":"10.8.5"}

/* Individual Methods */

_ns.Core.Utils.BrowserUtils.browser()

"chrome"

_ns.Core.Utils.BrowserUtils.browserVersion()

"32.0.1700.107"

_ns.Core.Utils.BrowserUtils.os()

"mac"

_ns.Core.Utils.BrowserUtils.osVersion()

"10.8.5"

/* 'is' Methods, Available For All Proper Cased Constants */

_ns.Core.Utils.BrowserUtils.isChrome()

true

_ns.Core.Utils.BrowserUtils.isOsx()

true

_ns.Core.Utils.BrowserUtils.isFirefox()

false

_ns.Core.Utils.BrowserUtils.isWindows()

false


/* Constants */

_ns.Core.Utils.BrowserUtils.CONSTANTS.OS

{
  OSX: "mac",
  WINDOWS: "win",
  LINUX: "linux",
  FREE_BSD: "freebsd",
  IPHONE: "iphone",
  IPOD: "ipod",
  IPAD: "ipad",
  ANDROID: "android",
  BLACKBERRY: "blackberry",
  J2ME: "j2me",
  WEB_TV: "webtv"
}

_ns.Core.Utils.BrowserUtils.CONSTANTS.BROWSER

{
  INTERNET_EXPLORER: "msie",
  FIREFOX: "firefox",
  CHROME: "chrome",
  SAFARI: "safari",
  OPERA: "opr"
}

```

### CollectionUtils

Get an item from a collection, by a property string.

```JavaScript
_ns.Core.Utils.CollectionUtils.itemByProperty(
  [{fruit: {id: 6, name: "Apple"}}, {fruit: {id: 7, name: "Pear"}}],
  "fruit.id",
  7)

{fruit: {id: 7, name: "Pear"}}
```

Update an item in a collection from a single property.

```JavaScript
_ns.Core.Utils.CollectionUtils.updateByProperty(
  [{id: 6, name: "Apple"}, {id: 7, name: "Pear"}],
  {id: 7, name: "Orange"},
  "id")

[{id: 6, name: "Apple"}, {id: 7, name: "Orange"}]
```

Remove an item from a single property.

```JavaScript
_ns.Core.Utils.CollectionUtils.removeByProperty(
  [{id: 6, name: "Apple"}, {id: 7, name: "Pear"}],
  {id: 7},
  "id")

[{id: 6, name: "Apple"}]
```

A unique map by property value.

```JavaScript
_ns.Core.Utils.CollectionUtils.uniqueMap(
  [{fruit: {id: 6, name: "Apple"}}, {fruit: {id: 7, name: "Pear"}}],
  "fruit.name")

{
  "Apple": {fruit: {id: 6, name: "Apple"}},
  "Pear": {fruit: {id: 7, name: "Pear"}}
}
```

A match for a single property contained in both collections.

```JavaScript
_ns.Core.Utils.CollectionUtils.containMatchByProperty(
  [{fruit: {id: 6, name: "Apple"}}, {fruit: {id: 7, name: "Pear"}}],
  [{fruit: {id: 5, name: "Orange"}}, {fruit: {id: 7, name: "Pear"}}]
  "fruit.name")

true

_ns.Core.Utils.CollectionUtils.containMatchByProperty(
  [{fruit: {id: 6, name: "Apple"}}, {fruit: {id: 7, name: "Pear"}}],
  [{fruit: {id: 5, name: "Orange"}}, {fruit: {id: 8, name: "Plum"}}]
  "fruit.name")

false
```

Check to see if collection contains another collection as subset. Non order specific.

```JavaScript
_ns.Core.Utils.CollectionUtils.collectionContainsAllOtherItems(
  [{fruit: {id: 6, name: "Apple"}}, {fruit: {id: 7, name: "Pear"}}, {fruit: {id: 5, name: "Orange"}}],
  [{fruit: {id: 5, name: "Orange"}}, {fruit: {id: 7, name: "Pear"}}]
  "fruit.id")

true

_ns.Core.Utils.CollectionUtils.collectionContainsAllOtherItems(
  [{fruit: {id: 6, name: "Apple"}}, {fruit: {id: 7, name: "Pear"}}],
  [{fruit: {id: 5, name: "Orange"}}, {fruit: {id: 8, name: "Plum"}}]
  "fruit.name")

false
```

Check to see if two collections contain the same values, order does not matter.

```JavaScript
_ns.Core.Utils.CollectionUtils.containsExclusively(
  [{fruit: {id: 7, name: "Pear"}}, {fruit: {id: 5, name: "Orange"}}],
  [{fruit: {id: 5, name: "Orange"}}, {fruit: {id: 7, name: "Pear"}}]
  "fruit.id")

true

_ns.Core.Utils.CollectionUtils.containsExclusively(
  [{fruit: {id: 8, name: "Plum"}}, {fruit: {id: 7, name: "Pear"}}, {fruit: {id: 5, name: "Orange"}}],
  [{fruit: {id: 5, name: "Orange"}}, {fruit: {id: 8, name: "Plum"}}]
  "fruit.name")

false
```

### DomUtils

Get all the elements with the attribute of value.

```JavaScript
_ns.Core.Utils.DomUtils.getElementsByAttribute("input", "type", "submit")

/* Returns native submit elements */

```

### FunctionalUtils

Try to call a function, doesn't fail if the object is not there.

```JavaScript
var possiblyBlankArray = ["Terry", "Jim", "Willis"];

_ns.Core.Utils.FunctionalUtils.tryCall(possiblyBlankArray, 'join', [', '], 'No Names Provided');

'Terry, Jim, Willis'

possiblyBlankArray = null;

_ns.Core.Utils.FunctionalUtils.tryCall(possiblyBlankArray, 'join', [', '], 'No Names Provided');

'No Names Provided'

```

### MapUtils

Get a property string off of a hash.

```JavaScript
_ns.Core.Utils.MapUtils.get(
  {fruit: {name: {first: "Pear"}}}, "fruit.name.first")

"Pear"

/* Fallback for when the property is not found */

_ns.Core.Utils.MapUtils.get(
  {fruit: {name: {first: "Pear"}}}, "fruit.otherName.last")

undefined
```

Get up to a length of 10 properties, no loops, more performant.

```JavaScript
_ns.Core.Utils.MapUtils.highPerformanceGet(
  {fruit: {name: {first: "Pear"}}}, "fruit.name.first")

"Pear"

/* Fallback for when the property is not found */

_ns.Core.Utils.MapUtils.highPerformanceGet(
  {fruit: {name: {first: "Pear"}}}, "fruit.otherName.last")

undefined
```

Apply a value to an object via string.

```JavaScript
var val = {names: {first: "Stein"};

_ns.Core.Utils.MapUtils.applyTo(val, "names.last", "Malloy")

/* Updates Val */

{names: {first: "Stein", last: "Malloy"}

```

Determine if the keys in multiple hashes are distinct.

```JavaScript
_ns.Core.Utils.MapUtils.keysDistinct({whoomp: 'there it is'}, {whoomp: 'here it goes'})

false

_ns.Core.Utils.MapUtils.keysDistinct({whoomp: 'there it is'}, {tagTeam: 'back again'})

true

```

### NumberUtils

Format number to ordinal string.

```JavaScript
_ns.Core.Utils.NumberUtils.asOrdinal(1)

"1st"

_ns.Core.Utils.NumberUtils.asOrdinal(25)

"25th"
```

Round up a float.

```JavaScript
_ns.Core.Utils.NumberUtils.roundUpIfFloat(1.22)

"2"

_ns.Core.Utils.NumberUtils.roundUpIfFloat(-37.00001)

"-38"
```

Leading zeroes. Number string.

```JavaScript
_ns.Core.Utils.NumberUtils.leadingZeroes(18, 6)

"000018"

_ns.Core.Utils.NumberUtils.leadingZeroes(-11.923, 4)

"-0011.923"
```

### RegexUtils

Match a string and all the characters leading up to it.

```JavaScript
_ns.Core.Utils.RegexUtils.matchStringAndLeadup("House")

/* Returns regex that matches h, H, ho, Ho, hou, Hou, etc. */
```

Check if a string is an email.

```JavaScript
_ns.Core.Utils.RegexUtils.isEmail("contact@neosavvy.com")

true
```

### SpecialUtils

Continue trying until a function does not throw an error.

```JavaScript
var f1 = function() {
  throw "Some error";
};
var f2 = function(a) {
  return a;
};

_ns.Core.Utils.SpecialUtils.keepTrying(f1, [], f2, ["First Argument"]);

"First Argument"
```

### StringUtils

Check if a string or number is blank, returns true for undefined, null, "" and "    ", etc.

```JavaScript
_ns.Core.Utils.StringUtils.isBlank(" ")

true

_ns.Core.Utils.StringUtils.isBlank(undefined)

true

_ns.Core.Utils.StringUtils.isBlank(0)

false
```

### UrlUtils

```JavaScript
/* Create Url Objects */

var url = _ns.Core.Utils.UrlUtils.parse("http://www.google.com:8888/api?param=56");

url.getHost()

"www.google.com"

url.setHost("www.amazon.com")

url.getPath()

/api

url.setPath("/another/api/call")

url.getParameter("param")

"56"

url.setParameter("otherParam", 447)

url.removeParameter("param")

url.getPort()

8888

url.toString()

"http://www.amazon.com:8888/another/api/call?otherParam=447"


/* Create URL Objects Using Constructor */

var url = new _ns.Core.Utils.UrlUtils.URL("http://www.google.com:8888/api?param=56");

/* All the same methods are implemented */


/* Create QueryString Objects */

var queryString = new _ns.Core.Utils.UrlUtils.QueryString("param=78&otherParam=cheese");

/* Also implements parse, get, set, remove, add */

```


### 0.1.1 - 09/29/2013

## LICENSE

The MIT License

Copyright (c) 2013 Neosavvy, http://www.neosavvy.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

Enjoy!

