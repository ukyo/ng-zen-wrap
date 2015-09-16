/*! ng-zen-wrap v0.1.0 - MIT License https://github.com/ukyo/ng-zen-wrap/blob/master/LICENSE */
var angular = require("angular");
'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

angular.module('ng-zen-wrap', []).directive('zen', function () {
  var createAttr = function createAttr(v, k) {
    return v ? k + '="' + v + '"' : k;
  };

  var createAttributes = function createAttributes(attrs) {
    return Object.keys(attrs).map(function (k) {
      return createAttr(attrs[k], k);
    }).join(' ');
  };

  var createWrapper = function createWrapper(elems, innerHTML) {
    var _elems = _toArray(elems);

    var first = _elems[0];

    var rest = _elems.slice(1);

    return elems.length === 0 ? innerHTML : '<' + first.el + ' ' + createAttributes(first.attrs) + '>' + createWrapper(rest, innerHTML) + '</' + first.el + '>';
  };

  return {
    restrict: 'E',
    template: function template(element, attr) {
      var elems = attr.def.trim().split(/\s*>\s*/).map(function (s) {
        var _s$match = s.match(/^([^.#\[]*)?(?:#([^.#\[]+))?([^\[]+)?(?:\[([^\]]+)\])?$/);

        var _s$match2 = _slicedToArray(_s$match, 5);

        var el = _s$match2[1];
        var id = _s$match2[2];
        var cls = _s$match2[3];
        var attrs = _s$match2[4];

        var elem = {
          el: el || 'div',
          attrs: {}
        };
        if (id) elem.attrs.id = id.trim();
        if (cls) elem.attrs['class'] = cls.replace(/\./g, ' ').trim();
        if (attrs) {
          attrs.trim().split(/\s+/).forEach(function (s) {
            var _ref = s.indexOf('=') ? s.split('=') : [s, ''];

            var _ref2 = _slicedToArray(_ref, 2);

            var k = _ref2[0];
            var v = _ref2[1];

            v = v.replace(/["']/g, '');
            result.attrs[k] = v;
          });
        }
        return elem;
      });

      return createWrapper(elems, element.innerHTML);
    }
  };
});