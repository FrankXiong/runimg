var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    webserver = require('gulp-webserver'),
    config = require('./config.json'),
    opn = require('opn'),
    clean = require('gulp-clean');
    
gulp.task('default',['clean'],function() {
    gulp.run("clean");
    gulp.run("generate");
    gulp.run("watch");
    gulp.run("server");
    gulp.run("openbrowser");
});

gulp.task('generate', ['img', 'js', 'html']);


gulp.task('js', function() {  
  return gulp.src('src/js/*.js')
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload())
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('img', function() {  
  return gulp.src('src/img/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/img'))
    .pipe(livereload())
    .pipe(notify({ message: 'img task complete' }));
});

gulp.task('html', function() {
  return gulp.src(['src/*.html'])
      .pipe(gulp.dest('dist/'))
      .pipe(livereload())
      .pipe(notify({message: 'HTML task complete'}));
});

//开启本地 Web 服务器功能
gulp.task('server', [ 'generate' ],function() {
  gulp.src( ['dist/'] )
    .pipe(webserver({
      host:             config.localserver.host,
      port:             config.localserver.port,
      livereload:       true,
      directoryListing: false
    }));
});

//通过浏览器打开本地 Web服务器 路径
gulp.task('openbrowser', function() {
  opn( 'http://' + config.localserver.host + ':' + config.localserver.port );
});

gulp.task('clean', function() {
  return gulp.src([
      'dist/css/**/*.css',
      'dist/css/*.css',
      'dist/img/*.*',
      'dist/js/**/*.js',
      'dist/js/**/*.min.js',
      'dist/*.html'
      ], {read: false})
    .pipe(clean({force: true}));
});


gulp.task('reload', ['clean', 'default']);

gulp.task('watch', function() {

    livereload.listen();
    gulp.watch(['src/**']).on('change', livereload.changed);

    gulp.watch('src/img/*.*', ['img']);   
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch('src/*.html', ['html']);

});





