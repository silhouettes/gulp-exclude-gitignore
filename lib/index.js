'use strict';
var fs = require('fs');
var path = require('path');
var flatten = require('flatten');
var gulpIgnore = require('gulp-ignore');

module.exports = function (gitignorePath) {
  gitignorePath = path.resolve(gitignorePath || '.gitignore');
  var base = path.dirname(gitignorePath);

  var contents = fs.readFileSync(gitignorePath, 'utf8');
  var ignoredFiles = contents.split('\n')
    .map(Function.prototype.call, String.prototype.trim) // trim lines
    .filter(Boolean) // ignore empty lines
    .map(function (str) {
      return [
        path.join(base, str + '**'),
        path.join(base, str + '/**')
      ];
    });

  return gulpIgnore.exclude(flatten(ignoredFiles));
};
