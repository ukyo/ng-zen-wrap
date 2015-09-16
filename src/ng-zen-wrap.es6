angular.module('ng-zen-wrap', []).directive('zen', () => {
  var createAttr = (v, k) => v ? `${k}="${v}"` : k;

  var createAttributes = (attrs) => Object.keys(attrs).map(k => createAttr(attrs[k], k)).join(' ');

  var createWrapper = (elems, innerHTML) => {
    var [first, ...rest] = elems;
    return elems.length === 0 ?
      innerHTML : `<${first.el} ${createAttributes(first.attrs)}>${createWrapper(rest, innerHTML)}</${first.el}>`;
  };

  return {
    restrict: 'E',
    template(element, attr) {
      var elems = attr.def.trim().split(/\s*>\s*/).map(s => {
        var [, el, id, cls, attrs] = s.match(/^([^.#\[]*)?(?:#([^.#\[]+))?([^\[]+)?(?:\[([^\]]+)\])?$/);
        var elem = {
          el: el || 'div',
          attrs: {}
        };
        if (id) elem.attrs.id = id.trim();
        if (cls) elem.attrs.class = cls.replace(/\./g, ' ').trim();
        if (attrs) {
          attrs.trim().split(/\s+/).forEach(s => {
            var [k, v] = s.indexOf('=') ? s.split('=') : [s, ''];
            v = v.replace(/["']/g, '');
            result.attrs[k] = v;
          });
        }
        return elem;
      });

      return createWrapper(elems, element.innerHTML);
    }
  }
});
