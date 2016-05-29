var gulp = require('gulp'),
    plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var htmlReplace = require('gulp-html-replace');


gulp.task('default', ['browser-sync'], function(){

  gulp.watch("src/styles/**/*.scss", ['sass']);
  gulp.watch("src/scripts/**/*.js", ['scripts']);
  gulp.watch("src/*.html", ['html']);
});


gulp.task('browser-sync', function() {
  
  browserSync({
    server: {
       baseDir: "./dist"
    }
  });

});


gulp.task('html', function () {

	gulp.src('src/*.html')
	.pipe(htmlReplace({
		js: 'scripts/main.js'
	}))
	.pipe(gulp.dest('dist/'))
  	.pipe(browserSync.reload({stream:true}))
});


gulp.task('images', function(){

	gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images/'));
});


gulp.task('fonts', function(){

	gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts/'));
});


gulp.task('sass', function(){

  gulp.src(['src/styles/**/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(gulp.dest('dist/styles/'))
    .pipe(browserSync.reload({stream:true}))
});


gulp.task('scripts', function(){

  return gulp.src(['src/scripts/jquery.js', 'src/scripts/main.js'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('build', ['sass', 'scripts', 'fonts', 'images', 'html'], function(){});





