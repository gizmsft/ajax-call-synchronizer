const { src, dest } = require('gulp');
const uglifyPlugin = require('gulp-uglify');
const renamePlugin = require('gulp-rename');
const sourceMapPlugin = require('gulp-sourcemaps');

var copyJsTask = function (callback) {
  src([
    './lib/ajax-call-synchronizer.js'])
    .pipe(dest('./dist/js'));

  callback();
}

var minifyJsTask = function (callback) {
  src([
    './lib/ajax-call-synchronizer.js'])
    .pipe(sourceMapPlugin.init())
    .pipe(uglifyPlugin())
    .pipe(renamePlugin(function (path) {
      path.basename += '.min';
    }))
    .pipe(sourceMapPlugin.write('.'))
    .pipe(dest('./dist/js'));

  callback();
}

var defaultTask = function (callback) {
  copyJsTask(callback);
  minifyJsTask(callback);

  callback();
}

exports.copyJs = copyJsTask;
exports.minifyJs = minifyJsTask;
exports.default = defaultTask;