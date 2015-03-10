var gulp = require('gulp');
var clean = require('gulp-clean');
var rename = require('gulp-rename');

var distSrc = 'dist/**/*';
gulp.task('remove', function() {
    return gulp.src(distSrc, {
            read: false
        })
        .pipe(clean());
});
gulp.task('js', function() {
    return gulp.src('asserts/js/test-a.js')
        .pipe(gulp.dest('dist/js'))
        .pipe(rename(function(path) {
        	console.log(path);
            path.suffix = ".min";
        }));
});
