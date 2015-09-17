angular.module('ng-zen-wrap', [])
.factory('$ngZenWrapParseSelector', () => {
  return (s) => {
    if (!s || !s.length) throw new Error('ng-zen-wrap: attribute is empty.');
    var [, el, id, cls, attrs] = s.match(/^([^.#\[]*)?(?:#([^.#\[]+))?([^\[]+)?(?:\[([^\]]+)\])?$/);
    el = el || 'div';
    return [el, id, cls, attrs];
  };
})

.directive('zen', ['$ngZenWrapParseSelector', (parseSelector) => {
  var createAttr = (v, k) => v ? `${k}="${v}"` : k;

  var createAttributes = (attrs) => Object.keys(attrs).map(k => createAttr(attrs[k], k)).join(' ');

  var createWrapper = (elems, innerHTML) => {
    var [first, ...rest] = elems;
    return elems.length === 0 ?
      innerHTML : `<${first.el} ${createAttributes(first.attrs)}>${createWrapper(rest, innerHTML)}</${first.el}>`;
  };

  return {
    restrict: 'E',
    replace: true,
    template(element, attr) {
      var elems = attr.def.trim().split(/\s*>\s*/).map(s => {
        var [el, id, cls, attrs] = parseSelector(s);
        var elem = {
          el,
          attrs: {}
        };
        if (id) elem.attrs.id = id.trim();
        if (cls) elem.attrs.class = cls.replace(/\./g, ' ').trim();
        if (attrs) {
          attrs.trim().split(/\s+/).forEach(s => {
            var [k, v] = s.indexOf('=') !== -1 ? s.split('=') : [s, ''];
            v = v.replace(/["']/g, '');
            elem.attrs[k] = v;
          });
        }
        return elem;
      });

      return createWrapper(elems, element.html());
    }
  }
}]);
