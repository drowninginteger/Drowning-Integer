

// project variables

var themePath = './';

var themeSassIncludePaths = [
	themePath + 'css'
];


// required variables

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();


// theme tasks

gulp.task('theme:css:dev', function() {
	return gulp.src(themePath + 'css/style.scss')
		.pipe($.sourcemaps.init())
		.pipe($.sass({ includePaths: themeSassIncludePaths })
			.on('error', $.notify.onError({ title: 'SASS Compilation Error', message: '<%= error.message %>' })))
		.pipe($.autoprefixer({ browsers: [ 'last 2 versions', 'ie >= 9' ], grid: true }))
		// .pipe($.cssnano())
		.pipe($.sourcemaps.write('./'))
		.pipe(gulp.dest(themePath + 'css/'))
		.pipe($.notify({ title: 'CSS Compiled Successfully', message: '<%= file.relative %>', onLast: true }))
});

gulp.task('theme:css:prod', gulp.series(['theme:css:dev', function() {
	return gulp.src(themePath + 'css/style.css')
		.pipe($.bless())
		.pipe(gulp.dest(themePath + 'css/'));
}]));

gulp.task('theme:js:prod', function() {
	return gulp.src([ themePath + 'js/**/*.js', '!' + themePath + 'js/**/*.min.js' ])
		.pipe($.uglify())
		.on('error', $.notify.onError({ title: 'JS Minification Error', message: '<%= error.message %>' }))
		.pipe($.rename({ extname: '.min.js' }))
		.pipe(gulp.dest(themePath + 'js/'))
		.pipe($.notify({ title: 'JS Minified Successfully', message: '<%= file.relative %>' }));
});


// watch tasks

gulp.task('watch:dev', function() {
	gulp.watch(themePath + 'css/**/*.scss', gulp.series(['theme:css:dev']));
	gulp.watch([ themePath + 'js/**/*.js', '!' + themePath + 'js/**/*.min.js' ], gulp.series(['theme:js:prod']));
});

gulp.task('watch:prod', function() {
	gulp.watch(themePath + 'css/**/*.scss', gulp.series(['theme:css:prod']));
	gulp.watch([ themePath + 'js/**/*.js', '!' + themePath + 'js/**/*.min.js' ], gulp.series(['theme:js:prod']));
});


// default task

gulp.task('default', gulp.series(['watch:prod']));