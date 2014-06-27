javascript-core
===============

Neosavvy, Inc. core libraries for Javascript.

## Getting Started
Via bower,

    bower install neosavvy-javascript-core

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
   Builders
   Utils
```

## Builders

Nest collections into properties.

```JavaScript
new ns.CollectionBuilder(
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

new ns.RequestUrlBuilder(
    "http://api.neosavvy.com/:user_id/clients/:company_id"
  )
  .paramReplace(":user_id", 150)
  .paramReplace(":company_id", 7)
  .addParam("page", 2)
  .build()

"http://api.neosavvy.com/150/clients/7?page=2"

/* Object Support */

new ns.RequestUrlBuilder(
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

new ns.StringBuilder(
    "myCamelCaseString"
  ).camelToDash().build()

"my-camel-case-string"


/* Constant Case To Dash */

new ns.StringBuilder(
    "MY_CONSTANT_CASE"
  ).constantToDash().build()

"my-constant-case"


/* Proper Case */
new ns.StringBuilder(
    "MY iNCorrect cAse"
  ).camelToDash().build()

"My Incorrect Case"
```

### BrowserUtils

Browser and user agent info.

```JavaScript
/* Full Info Hash */

ns.info()

{"browser":"chrome","browserVersion":"32.0.1700.107","os":"mac","osVersion":"10.8.5"}

/* Individual Methods */

ns.browser()

"chrome"

ns.browserVersion()

"32.0.1700.107"

ns.os()

"mac"

ns.osVersion()

"10.8.5"

/* 'is' Methods, Available For All Proper Cased Constants */

ns.isChrome()

true

ns.isOsx()

true

ns.isFirefox()

false

ns.isWindows()

false


/* Constants */

ns.CONSTANTS.OS

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

ns.BrowserUtils.CONSTANTS.BROWSER

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
ns.itemByProperty(
  [{fruit: {id: 6, name: "Apple"}}, {fruit: {id: 7, name: "Pear"}}],
  "fruit.id",
  7)

{fruit: {id: 7, name: "Pear"}}
```

Update an item in a collection from a single property.

```JavaScript
ns.updateByProperty(
  [{id: 6, name: "Apple"}, {id: 7, name: "Pear"}],
  {id: 7, name: "Orange"},
  "id")

[{id: 6, name: "Apple"}, {id: 7, name: "Orange"}]
```

Remove an item from a single property.

```JavaScript
ns.removeByProperty(
  [{id: 6, name: "Apple"}, {id: 7, name: "Pear"}],
  {id: 7},
  "id")

[{id: 6, name: "Apple"}]
```

A unique map by property value.

```JavaScript
ns.uniqueMap(
  [{fruit: {id: 6, name: "Apple"}}, {fruit: {id: 7, name: "Pear"}}],
  "fruit.name")

{
  "Apple": {fruit: {id: 6, name: "Apple"}},
  "Pear": {fruit: {id: 7, name: "Pear"}}
}
```

A match for a single property contained in both collections.

```JavaScript
ns.containMatchByProperty(
  [{fruit: {id: 6, name: "Apple"}}, {fruit: {id: 7, name: "Pear"}}],
  [{fruit: {id: 5, name: "Orange"}}, {fruit: {id: 7, name: "Pear"}}]
  "fruit.name")

true

ns.containMatchByProperty(
  [{fruit: {id: 6, name: "Apple"}}, {fruit: {id: 7, name: "Pear"}}],
  [{fruit: {id: 5, name: "Orange"}}, {fruit: {id: 8, name: "Plum"}}]
  "fruit.name")

false
```

Check to see if collection contains another collection as subset. Non order specific.

```JavaScript
ns.collectionContainsAllOtherItems(
  [{fruit: {id: 6, name: "Apple"}}, {fruit: {id: 7, name: "Pear"}}, {fruit: {id: 5, name: "Orange"}}],
  [{fruit: {id: 5, name: "Orange"}}, {fruit: {id: 7, name: "Pear"}}]
  "fruit.id")

true

ns.collectionContainsAllOtherItems(
  [{fruit: {id: 6, name: "Apple"}}, {fruit: {id: 7, name: "Pear"}}],
  [{fruit: {id: 5, name: "Orange"}}, {fruit: {id: 8, name: "Plum"}}]
  "fruit.name")

false
```

Check to see if two collections contain the same values, order does not matter.

```JavaScript
ns.containsExclusively(
  [{fruit: {id: 7, name: "Pear"}}, {fruit: {id: 5, name: "Orange"}}],
  [{fruit: {id: 5, name: "Orange"}}, {fruit: {id: 7, name: "Pear"}}]
  "fruit.id")

true

ns.containsExclusively(
  [{fruit: {id: 8, name: "Plum"}}, {fruit: {id: 7, name: "Pear"}}, {fruit: {id: 5, name: "Orange"}}],
  [{fruit: {id: 5, name: "Orange"}}, {fruit: {id: 8, name: "Plum"}}]
  "fruit.name")

false
```

### DomUtils

Get all the elements with the attribute of value.

```JavaScript
ns.getElementsByAttribute("input", "type", "submit")

/* Returns native submit elements */

```

### FunctionalUtils

Try to call a function, doesn't fail if the object is not there.

```JavaScript
var possiblyBlankArray = ["Terry", "Jim", "Willis"];

ns.tryCall(possiblyBlankArray, 'join', [', '], 'No Names Provided');

'Terry, Jim, Willis'

possiblyBlankArray = null;

ns.tryCall(possiblyBlankArray, 'join', [', '], 'No Names Provided');

'No Names Provided'

```

### MapUtils

Get a property string off of a hash.

```JavaScript
ns.get(
  {fruit: {name: {first: "Pear"}}}, "fruit.name.first")

"Pear"

/* Fallback for when the property is not found */

ns.get(
  {fruit: {name: {first: "Pear"}}}, "fruit.otherName.last")

undefined
```

Get up to a length of 10 properties, no loops, more performant.

```JavaScript
ns.highPerformanceGet(
  {fruit: {name: {first: "Pear"}}}, "fruit.name.first")

"Pear"

/* Fallback for when the property is not found */

ns.highPerformanceGet(
  {fruit: {name: {first: "Pear"}}}, "fruit.otherName.last")

undefined
```

Apply a value to an object via string.

```JavaScript
var val = {names: {first: "Stein"};

ns.applyTo(val, "names.last", "Malloy")

/* Updates Val */

{names: {first: "Stein", last: "Malloy"}

```

Determine if the keys in multiple hashes are distinct.

```JavaScript
ns.keysDistinct({whoomp: 'there it is'}, {whoomp: 'here it goes'})

false

ns.keysDistinct({whoomp: 'there it is'}, {tagTeam: 'back again'})

true

```

### NumberUtils

Format number to ordinal string.

```JavaScript
ns.asOrdinal(1)

"1st"

ns.asOrdinal(25)

"25th"
```

Round up a float.

```JavaScript
ns.roundUpIfFloat(1.22)

"2"

ns.roundUpIfFloat(-37.00001)

"-38"
```

Leading zeroes. Number string.

```JavaScript
ns.leadingZeroes(18, 6)

"000018"

ns.leadingZeroes(-11.923, 4)

"-0011.923"
```

### RegexUtils

Match a string and all the characters leading up to it.

```JavaScript
ns.matchStringAndLeadup("House")

/* Returns regex that matches h, H, ho, Ho, hou, Hou, etc. */
```

Check if a string is an email.

```JavaScript
ns.isEmail("contact@neosavvy.com")

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

ns.keepTrying(f1, [], f2, ["First Argument"]);

"First Argument"
```

### StringUtils

Check if a string or number is blank, returns true for undefined, null, "" and "    ", etc.

```JavaScript
ns.isBlank(" ")

true

ns.isBlank(undefined)

true

ns.isBlank(0)

false
```

### UrlUtils

```JavaScript
/* Create Url Objects */

var url = ns.parse("http://www.google.com:8888/api?param=56");

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

var url = new ns.URL("http://www.google.com:8888/api?param=56");

/* All the same methods are implemented */


/* Create QueryString Objects */

var queryString = new ns.QueryString("param=78&otherParam=cheese");

/* Also implements parse, get, set, remove, add */

```


### 0.1.2 - 09/29/2013

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

