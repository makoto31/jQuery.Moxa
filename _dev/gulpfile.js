var fs 			= require('fs');
var gulp		= require('gulp');
var closure 	= require('gulp-closurecompiler');
var concat		= require('gulp-concat');
var plumber		= require('gulp-plumber');
var notify		= require('gulp-notify');
var browser 	= require('browser-sync');


gulp.task('js', function(){
	gulp.src('./js/*.js')
		.pipe(plumber({
			errorHandler: notify.onError('Error: <%= error.message %>')
		}))
		.pipe(closure({
			fileName: 'jquery.moxa.min.js'
		}))
		.pipe(gulp.dest('../'))
		.on('end', function(){
			gulp.src(['./js/LICENSE.header', '../jquery.moxa.min.js'])
				.pipe(concat('jquery.moxa.min.js'))
				.pipe(gulp.dest('../'));
		});
		
});


gulp.task('watch', function(){
	gulp.watch('./js/*.js', ['js']);
});


gulp.task('server', function(){
	browser({
		server: {
			baseDir: '../'
		}
		,startPath: '/example/example.html'
		,ui: false
		,files: ['../example/*.html', '../example/*.js', '../example/*.css', '../*.js']
	});
});

gulp.task('release', function(){

	// ex) gulp release -v 0.1.2
	var tag = process.argv[process.argv.length - 1];

	var targets = {
		'./package.json'			: '"version": "'
		,'../package.json'			: '"version": "'
		,'./js/LICENSE.header'		: 'jQuery.Moxa: v.'
		,'./js/jquery.moxa.js'		: 'jQuery.Moxa: v.'
		,'../jquery.moxa.min.js'	: 'jQuery.Moxa: v.'
		,'../bower.json'			: '"version": "'
	};

	Object.keys(targets).forEach(function(aKey) {
		var value = targets[aKey];

		fs.readFile(aKey, 'utf8', function(aErr, aData){

			if(aErr){
				console.log(aErr);
				return;
			}

			var data = aData.replace(new RegExp(value + '[0-9]+.[0-9]+.[0-9]+'), value + tag);

			fs.writeFile(aKey, data , function (err) {
				if(aErr){
					console.log(aErr);
				}
			})
		});
	});

	console.log('\033[31m### 1. npm publish');
	console.log('\033[31m### 2. index.html code version update.');
});

gulp.task('default', ['js', 'watch', 'server']);
