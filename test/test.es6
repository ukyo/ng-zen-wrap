describe('ng-zen-wrap', () => {
  var $scope, $compile, parseSelector;

  var compile = s => $compile(s)($scope);
  var truthy = (x) => !!x;

  var isEqual = ($el, s) => $el[0].isEqualNode($(s).addClass("ng-scope")[0])

  beforeEach(module('ng-zen-wrap'));
  beforeEach(inject(($rootScope, _$compile_, $ngZenWrapParseSelector) => {
    $scope = $rootScope.$new();
    $compile = _$compile_;
    parseSelector = $ngZenWrapParseSelector;
  }));

  describe('$ngZenWrapParseSelector', () => {
    it('throws a error with empty string', () => {
      assert.throws(parseSelector.bind(null, ''), 'ng-zen-wrap: attribute is empty.');
    });

    it('parses ELEMENT', () => {
      assert.deepEqual(parseSelector('div'), ['div', undefined, undefined, undefined]);

    });

    it('parses ID', () => {
      assert.deepEqual(parseSelector('#a'), ['div', 'a', undefined, undefined]);

    });

    it('parses CLASSES', () => {
      assert.deepEqual(parseSelector('.a'), ['div', undefined, '.a', undefined]);
      assert.deepEqual(parseSelector('.a.b'), ['div', undefined, '.a.b', undefined]);

    });

    it('parses ATTRIBUTES', () => {
      assert.deepEqual(parseSelector('[a]'), ['div', undefined, undefined, 'a']);
      assert.deepEqual(parseSelector('[a=a]'), ['div', undefined, undefined, 'a=a']);
      assert.deepEqual(parseSelector("[a='a']"), ['div', undefined, undefined, "a='a'"]);
      assert.deepEqual(parseSelector('[a="a"]'), ['div', undefined, undefined, 'a="a"']);
      assert.deepEqual(parseSelector('[a b="b" c=c d=\'d\']'), ['div', undefined, undefined, 'a b="b" c=c d=\'d\'']);
    });

    it('parses CLASSES,ATTRIBUTES', () => {
      assert.deepEqual(parseSelector('.a[a]'), ['div', undefined, '.a', 'a']);
    });

    it('parses ID,CLASSES', () => {
      assert.deepEqual(parseSelector('#a.a'), ['div', 'a', '.a', undefined]);
    });

    it('parses ID,CLASSES,ATTRIBUTES', () => {
      assert.deepEqual(parseSelector('#a.a[a]'), ['div', 'a', '.a', 'a']);
    });

    it('parses ELEMENT,ID,CLASSES,ATTRIBUTES', () => {
      assert.deepEqual(parseSelector('p#a.a[a]'), ['p', 'a', '.a', 'a']);
    });

    it('parses ELEMENT,ID', () => {
      assert.deepEqual(parseSelector('p#a'), ['p', 'a', undefined, undefined]);
    });

    it('parses ELEMENT,ID,CLASSES', () => {
      assert.deepEqual(parseSelector('p#a.a'), ['p', 'a', '.a', undefined]);
    });

    it('parses ELEMEMT,ATTRIBUTES', () => {
      assert.deepEqual(parseSelector('p[a]'), ['p', undefined, undefined, 'a']);
    });

    it('parses ELEMEMT,ID,ATTRIBUTES', () => {
      assert.deepEqual(parseSelector('p#a[a]'), ['p', 'a', undefined, 'a']);
    });

    it('parses ELEMENT,CLASSES,ATTRIBUTES', () => {
      assert.deepEqual(parseSelector('p.a[a]'), ['p', undefined, '.a', 'a']);
    });
  });

  describe('zen directive', () => {
    it('ELEMENT', () => {
      assert.ok(isEqual(
        compile(`<zen def="div">zencoding</zen>`),
        `<div def="div">zencoding</div>`
      ));
    });

    it('ID', () => {
      assert.ok(isEqual(
        compile(`<zen def="#a">zencoding</zen>`),
        `<div def="#a" id="a">zencoding</div>`
      ));
    });

    it('CLASSES', () => {
      assert.ok(isEqual(
        compile(`<zen def=".a">zencoding</zen>`),
        `<div def=".a" class="a">zencoding</div>`
      ));

      assert.ok(isEqual(
        compile(`<zen def=".a.b">zencoding</zen>`),
        `<div def=".a.b" class="a b">zencoding</div>`
      ));
    });

    it('ATTRIBUTES', () => {
      assert.ok(isEqual(
        compile(`<zen def="[a]">zencoding</zen>`),
        `<div def="[a]" a>zencoding</div>`
      ));

      assert.ok(isEqual(
        compile(`<zen def="[a=a]">zencoding</zen>`),
        `<div def="[a=a]" a="a">zencoding</div>`
      ));

      assert.ok(isEqual(
        compile(`<zen def="[a='a']">zencoding</zen>`),
        `<div def="[a='a']" a="a">zencoding</div>`
      ));

      assert.ok(isEqual(
        compile(`<zen def='[a="a"]'>zencoding</zen>`),
        `<div def='[a="a"]' a="a">zencoding</div>`
      ));
    });

    it('SELECTOR > SELECTOR', () => {
      assert.ok(isEqual(
        compile(`<zen def="div>div">zencoding</zen>`),
        `<div def="div>div"><div>zencoding</div></div>`
      ));

      assert.ok(isEqual(
        compile(`<zen def="div>div>.foo">zencoding</zen>`),
        `<div def='div>div>.foo'><div><div class="foo">zencoding</div></div></div>`
      ));
    });

    it('nest', () => {
      console.log(compile('<zen def="div>p"><zen def="b.a">zencoding</zen></zen>')[0].outerHTML);
      assert.ok(isEqual(
        compile('<zen def="div>p"><zen def="b.a">zencoding</zen></zen>'),
        `<div def="div>p"><p><b class="a" def="b.a">zencoding</b></p></div>`
      ));
    });
  });
});
