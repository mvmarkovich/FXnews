var gulp            = require('gulp');
var jade            = require('gulp-jade');
var uglify          = require('gulp-uglify');
var sass            = require('gulp-sass');

var path            = require('path');
var fs              = require('fs');
var merge           = require('merge-stream');

var $               = require('gulp-load-plugins')();


/* #### jade to HTML #### */


gulp.task('jade', function(){
    gulp.src('./src/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./dist'))
})


gulp.task('compress', function(){
    gulp.src('libs/*.js')
        .pipe(uglify())
        .pipe.dest('dist/scripts/')
})

/* #### sass to CSS ####*/

var prefix_list = [
    'last 15 version',
    'ie >= 9',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 40',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

gulp.task('styles', function(){
    /* #### sass to CSS ####*/
    gulp.task('styles', function(){
        var merged = merge();

        fs.readdirSync('./src/scss/').filter(function(subdir) {
            return fs.statSync(path.join('./src/scss/', subdir)).isDirectory();
        }).forEach(function(subdir) {
            merged.add(gulp.src(path.join('./src/scss/', subdir, '*.scss'))
                .pipe(sass())
                .pipe($.autoprefixer({
                    browsers: prefix_list,
                    cascade: false
                }))
                .pipe($.csscomb('./csscomb.json'))
                .pipe($.concat(subdir + '.css'))
                .pipe(gulp.dest('./dist/styles')));
        });
        return merged;
    })
})

gulp.task('watch', function(){
    gulp.watch(path.join('./src/scss/**/*.scss'), ['styles']);
    gulp.watch('./src/*.jade', ['jade']);

})


gulp.task('default', ['watch', 'styles', 'jade'])