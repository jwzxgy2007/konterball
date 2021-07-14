var gulp            = require('gulp')
// var gulpSequence    = require('gulp-sequence')
var gulpSequence = require('gulp4-run-sequence');
var getEnabledTasks = require('../lib/getEnabledTasks')

var defaultTask = function(cb) {
  var tasks = getEnabledTasks('watch')
  gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, 'static', 'watch', cb)
}

gulp.task('default', defaultTask)
module.exports = defaultTask
