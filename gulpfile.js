
var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var connect = require('gulp-connect');

var jsSources = ['scripts/**/*.js'],
	htmlSources = ['**/*.html'],
	outputDir = 'assets';

var jsDestination = 'script.js';

gulp.task('log', function() {
	gutil.log('== My Log Task ==')
});
gulp.task('copy',function() {
	gulp.src('index.html')
	.pipe(gulp.dest(outputDir))
});

gulp.task('js', function() {
	gulp.src(jsSources)
	.pipe(uglify())
	.pipe(concat(jsDestination))
	.pipe(gulp.dest(outputDir))
	.pipe(connect.reload())
});

gulp.task('html', function() {
	gulp.src(htmlSources)
	.pipe(connect.reload())
});

// WATCH TASK
gulp.task('watch', function() {
	gulp.watch(jsSources, ['js']);
	gulp.watch(htmlSources, ['html'])
});

// CONNECT TASK
gulp.task('connect', function() {
	connect.server({
		root: '.',
		livereload: true
	})
});

// DEFAULT TASK
gulp.task('default',[
	'html',
	'js',
	'connect',
	'watch'
]);
