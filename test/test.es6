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
    it('foo', () => {
      var els = ['', 'div', 'p']
      var id = {
        '#a': 'a'
      };
      var clss = {
        '.a': 'a',
        '.a.b': 'a b'
      };
      var attrs = {
        '[a]': 'a',
        '[a=a]': 'a="a"',
        '[a="a"]': 'a="a"',
        "[a='a']": 'a="a"'
      };

      assert.throws(parseSelector.bind(null, ''), 'ng-zen-wrap: attribute is empty.');
      assert.deepEqual(parseSelector('div'), ['div', undefined, undefined, undefined]);
      assert.deepEqual(parseSelector('#a'), ['div', 'a', undefined, undefined]);
      assert.deepEqual(parseSelector('.a'), ['div', undefined, '.a', undefined]);
      assert.deepEqual(parseSelector('.a.b'), ['div', undefined, '.a.b', undefined]);
      assert.deepEqual(parseSelector('[a]'), ['div', undefined, undefined, 'a']);
      assert.deepEqual(parseSelector('[a=a]'), ['div', undefined, undefined, 'a=a']);
      assert.deepEqual(parseSelector("[a='a']"), ['div', undefined, undefined, "a='a'"]);
      assert.deepEqual(parseSelector('[a="a"]'), ['div', undefined, undefined, 'a="a"']);
      assert.deepEqual(parseSelector('[a b="b" c=c d=\'d\']'), ['div', undefined, undefined, 'a b="b" c=c d=\'d\'']);

      assert.deepEqual(parseSelector('.a[a]'), ['div', undefined, '.a', 'a']);
      assert.deepEqual(parseSelector('#a.a'), ['div', 'a', '.a', undefined]);
      assert.deepEqual(parseSelector('#a.a[a]'), ['div', 'a', '.a', 'a']);
      assert.deepEqual(parseSelector('p#a.a[a]'), ['p', 'a', '.a', 'a']);
      assert.deepEqual(parseSelector('p#a'), ['p', 'a', undefined, undefined]);
      assert.deepEqual(parseSelector('p#a.a'), ['p', 'a', '.a', undefined]);
      assert.deepEqual(parseSelector('p[a]'), ['p', undefined, undefined, 'a']);
      assert.deepEqual(parseSelector('p#a.a'), ['p', 'a', '.a', undefined]);
      assert.deepEqual(parseSelector('p#a[a]'), ['p', 'a', undefined, 'a']);
      assert.deepEqual(parseSelector('p.a[a]'), ['p', undefined, '.a', 'a']);
    });

  });

  it('ELEMENT', () => {
    assert.ok(isEqual(
      compile(`<zen def="div">zencoding</zen>`),
      `<div def="div">zencoding</div>`
    ));

    assert.ok(isEqual(
      compile(`<zen def="p">zencoding</zen>`),
      `<p def="p">zencoding</p>`
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

  it('CLASSES ATTRIBUTES', () => {
    // assert.ok(isEqual(compile(`<zen def=".a[a]">zencoding</zen>`), `<div def=".a" class="a">zencoding</div>`));
    // assert.ok(isEqual(compile(`<zen def=".a[a=a]">zencoding</zen>`), `<div def=".a" class="a">zencoding</div>`));
    // assert.ok(isEqual(compile(`<zen def=".a[a='a']">zencoding</zen>`), `<div def=".a" class="a">zencoding</div>`));
    // assert.ok(isEqual(compile(`<zen def='.a[a="a"]'>zencoding</zen>`), `<div def=".a" class="a">zencoding</div>`));
    // assert.ok(isEqual(compile(`<zen def=".a[a]">zencoding</zen>`), `<div def=".a" class="a">zencoding</div>`));
    // assert.ok(isEqual(compile(`<zen def=".a[a]">zencoding</zen>`), `<div def=".a" class="a">zencoding</div>`));
    // assert.ok(isEqual(compile(`<zen def=".a[a]">zencoding</zen>`), `<div def=".a" class="a">zencoding</div>`));
    // assert.ok(isEqual(compile(`<zen def=".a[a]">zencoding</zen>`), `<div def=".a" class="a">zencoding</div>`));
  });

  it('ID CLASSES', () => {

  });

  it('ID ATTRIBUTES', () => {

  });

  it('ID CLASSES ATTRIBUTES', () => {

  });

  it('ELEMENT ID', () => {
    assert.ok(isEqual(
      compile(`<zen def="div#foo">zencoding</zen>`),
      `<div def="div#foo" id="foo">zencoding</div>`
    ));
  });

  it('ELEMENT CLASSES', () => {
    assert.ok(isEqual(
      compile(`<zen def="div.a">zencoding</zen>`),
      `<div def="div.a" class="a">zencoding</div>`
    ));

    assert.ok(isEqual(
      compile(`<zen def="div.a.b">zencoding</zen>`),
      `<div def="div.a.b" class="a b">zencoding</div>`
    ));
  });

  it('ELEMENT ATTRIBUTES', () => {
    assert.ok(isEqual(
      compile(`<zen def="div[a]">zencoding</zen>`),
      `<div def="div[a]" a>zencoding</div>`
    ));

    assert.ok(isEqual(
      compile(`<zen def="div[a=a]">zencoding</zen>`),
      `<div def="div[a=a]" a="a">zencoding</div>`
    ));

    assert.ok(isEqual(
      compile(`<zen def="div[a='a']">zencoding</zen>`),
      `<div def="div[a='a']" a="a">zencoding</div>`
    ));

    assert.ok(isEqual(
      compile(`<zen def='div[a="a"]'>zencoding</zen>`),
      `<div def='div[a="a"]' a="a">zencoding</div>`
    ));
  });

  it('ELEMENT ID CLASSES', () => {

  });

  it('ELEMENT ID ATTRIBUTES', () => {

  });

  it('ELEMENT CLASSES ATTRIBUTES', () => {

  });

  it('ELEMENT ID CLASSES ATTRIBUTES', () => {

  });
});
