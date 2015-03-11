var gulp = require('gulp');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// 清空目标文件夹的内容
gulp.task('remove', function() {
    return gulp.src('dist/**/*', {
            read: false
        })
        .pipe(clean());
});

// 压缩
gulp.task('js-min', function() {
    return gulp.src('asserts/**/*.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['remove', 'js-min']);
