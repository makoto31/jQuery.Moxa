var fs 			= require('fs');
var gulp		= require('gulp');
var closure 	= require('gulp-closurecompiler');
var concat		= require('gulp-concat');
var plumber		= require('gulp-plumber');
var pleeease 	= require('gulp-pleeease');
var sass 		= require('gulp-sass');
var notify		= require('gulp-notify');
var browser 	= require('browser-sync');


gulp.task('js', function(){
	gulp.src('./js/*.js')
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(closure({
			fileName: 'example.min.js'
		}))
		.pipe(gulp.dest('../'));		
});


gulp.task('sass', function(){
	gulp.src('./sass/*.scss')
		.pipe(plumber({
		      errorHandler: notify.onError("Error: <%= error.message %>")
	    }))
		.pipe(concat('example.min.scss'))
		.pipe(sass())
		.pipe(pleeease({
			fallbacks:{
				autoprefixer: true
			}
			,optimizers:{
				minifier: true
			}
		}))
		.pipe(gulp.dest('../'))
});


gulp.task('server', function(){
	browser({
		server: {
			baseDir: '../../'
		}
		,startPath: '/example_gulp/example.html'
		,ui: false
	});
});


gulp.task('default', ['js', 'sass', 'server']);
