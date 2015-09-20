# ng-zen-wrap

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
