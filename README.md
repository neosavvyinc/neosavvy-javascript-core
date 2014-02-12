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
Neosavvy.Core.Builders
Neosavvy.Core.Utils
```

## Neosavvy.Core.Builders

Nest collections into properties.

```JavaScript
new Neosavvy.Core.Builders.CollectionBuilder(
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

new Neosavvy.Core.Builders.RequestUrlBuilder(
    "http://api.neosavvy.com/:user_id/clients/:company_id"
  )
  .paramReplace(":user_id", 150)
  .paramReplace(":company_id", 7)
  .addParam("page", 2)
  .build()

"http://api.neosavvy.com/150/clients/7?page=2"

/* Object Support */

new Neosavvy.Core.Builders.RequestUrlBuilder(
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

new Neosavvy.Core.Builders.StringBuilder(
    "myCamelCaseString"
  ).camelToDash().build()

"my-camel-case-string"


/* Constant Case To Dash */

new Neosavvy.Core.Builders.StringBuilder(
    "MY_CONSTANT_CASE"
  ).constantToDash().build()

"my-constant-case"


/* Proper Case */
new Neosavvy.Core.Builders.StringBuilder(
    "MY iNCorrect cAse"
  ).camelToDash().build()

"My Incorrect Case"
```

## Neosavvy.Core.Utils

# Neosavvy.Core.Utils.BrowserUtils


### 0.0.6 - 09/29/2013

Initial release.

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

