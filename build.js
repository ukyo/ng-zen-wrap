var pkg = require('./package.json');
var bower = require('./bower.json');
var fs = require('fs');
var path = require('path');
var babel = require("babel-core");

var license = '/*! ' + pkg.name + ' v' + pkg.version + ' - MIT License ' + pkg.homepage + '/blob/master/LICENSE */\n';
var src = path.resolve(__dirname, 'src/ng-zen-wrap.es6');
var s = babel.transform(fs.readFileSync(src, 'utf8')).code;

// update bower version
bower.version = pkg.version;
fs.writeFileSync(path.resolve(__dirname, 'bower.json'), JSON.stringify(bower, null, 2));
// node
fs.writeFileSync(path.resolve(__dirname, 'dist/ng-zen-wrap.common.js'), license + 'var angular = require("angular");\n' + s);
// browser
fs.writeFileSync(path.resolve(__dirname, 'dist/ng-zen-wrap.js'), license + '(function(){\n' + s + '\n}());');
