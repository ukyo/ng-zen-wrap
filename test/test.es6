describe('ng-zen-wrap', () => {
  var $scope, $compile;

  var compile = s => $compile(`<div>${s}</div>`)($scope);

  beforeEach(module('ng-zen-wrap'));
  beforeEach(inject(($rootScope, _$compile_) => {
    $scope = $rootScope.$new();
    $compile = _$compile_;
  }));

  it('ELEMENT', () => {
    var el = compile(`<zen def="div">zencoding</zen>`);
    assert.ok(false);
  });

  it('ID', () => {
    var el = compile(`<zen def="#a">zencoding</zen>`);
    assert.ok(false);
  });

  it('CLASSES', () => {
    var el = compile(`<zen def=".a">zencoding</zen>`);
    assert.ok(false);

    var el = compile(`<zen def=".a.b">zencoding</zen>`);
    assert.ok(false);
  });

  it('ATTRIBUTES', () => {
    var el = compile(`<zen def="[a]">zencoding</zen>`);
    assert.ok(false);

    var el = compile(`<zen def="[a=a]">zencoding</zen>`);
    assert.ok(false);

    var el = compile(`<zen def="[a='a']">zencoding</zen>`);
    assert.ok(false);

    var el = compile(`<zen def='[a="a"]'>zencoding</zen>`);
    assert.ok(false);
  });

  it('ELEMENT ID', () => {
    var el = compile(`<zen def="div#foo">zencoding</zen>`);
    assert.ok(false);
  });

  it('ELEMENT CLASSES', () => {
    var el = compile(`<zen def="div.foo">zencoding</zen>`);
    assert.ok(false);

    var el = compile(`<zen def="div.foo.bar">zencoding</zen>`);
    assert.ok(false);
  });

  it('ELEMENT ATTRIBUTES', () => {
    var el = compile(`<zen>zencoding</zen>`);
    assert.ok(false);
  });
});
