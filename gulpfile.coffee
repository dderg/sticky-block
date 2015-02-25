gulp = require "gulp"
coffee = require "gulp-coffee"
uglify = require "gulp-uglify"

gulp.task "coffee", ->
  gulp.src "sticky.coffee"
    .pipe do coffee
    #.pipe do uglify
    .pipe gulp.dest "./"

gulp.task "watch", ->
  gulp.watch "sticky.coffee", ["coffee"]

gulp.task "default", ["coffee", "watch"]