var config       = require('../config')
var gulp         = require('gulp')
// var gulpSequence = require('gulp-sequence')
var gulpSequence = require('gulp4-run-sequence')

var getEnabledTasks = require('../lib/getEnabledTasks')

var productionTask = function(cb) {
  global.production = true
  var tasks = getEnabledTasks('production')
  console.log(tasks.assetTasks, tasks.codeTasks, config.tasks.production.rev)
  gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, config.tasks.production.rev ? 'rev': false, 'size-report', 'static', cb)
}

gulp.task('production', productionTask)
module.exports = productionTask
