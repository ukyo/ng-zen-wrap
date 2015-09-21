# ng-zen-wrap

You do not have to write the deep nest element.The zencoding like notation helps you.

# Install and Setup

bower

```
bower install --save ng-zen-wrap
```

```
angular.module('your-module', ['ng-zen-wrap'])
```


npm

```
npm install --save ng-zen-wrap
```

```
angular.module('your-module', [require('ng-zen-wrap')])
```

# Usage

source

```html
<zen def="div>.foo>#bar>p[a=baz]">zencoding</zen>
```

out

```html
<div>
  <div class="foo">
    <div id="bar">
      <p a="baz">zencoding</p>
    </div>
  </div>
</div>
```
