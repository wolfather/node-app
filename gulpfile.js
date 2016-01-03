'use strict';

const gulp = require('gulp'),
	compass = require('gulp-compass'),
	jade = require('gulp-jade'), 
	ngAnnotate = require('gulp-ng-annotate'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	watch = require('gulp-watch')

var jsFilesToCompress = [
	'dev/components/angular/angular.min.js', 
	'dev/components/angular-resource/angular-resource.min.js',
	'dev/components/angular-route/angular-route.min.js',
	'dev/js/app.js',
	'dev/js/route/app.route.js',
	'dev/js/value/app.http.value.js',
	'dev/js/factory/app.factory.home.js',
	'dev/js/service/app.service.sendqtdy.js',
	'dev/js/controller/app.home.controller.js',
	'dev/js/controller/app.product.controller.js',
	'dev/js/controller/app.checkout.controller.js',
	'dev/js/directive/app.directive.productitem.js',
	'dev/js/directive/app.directive.productboxdetail.js'
]

gulp
	.task('dev', ['watch', 'compass', 'jade', 'devscripts'])

	.task('build', ['compass', 'jade', 'buildscripts'])
	
	.task('devscripts', ()=> { 
		gulp.src(jsFilesToCompress)
			//.pipe(watch('./dev/**/*.js'))
			.pipe(concat('main.js'))
			.pipe(ngAnnotate())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('./build/js'))
	})

	.task('buildscripts', ()=> { 
		gulp.src(jsFilesToCompress)
			//.pipe(watch('./dev/**/*.js'))
			.pipe(concat('main.js'))
			.pipe(ngAnnotate())
			.pipe(rename({suffix: '.min'}))
			.pipe(uglify({
				mangle: false,
				compress: {
					global_defs: {
						"DEBUG": false
					},
					drop_console: true
				}
			}))
			.pipe(gulp.dest('./build/js'))
	})

	.task('devlint', ()=> {
		return gulp.src('dev/js/**/*.js')
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			//.pipe(jshint.reporter('jshint-stylish'))
			//.pipe(jshint.reporter('fail'));
	})

	.task('jade', ()=> {
		return gulp.src('./dev/jade/**/[^?!\_]*.jade')
			.pipe(jade())
			//.pipe(watch('./dev/jade/**/*.jade'))
			.pipe(gulp.dest('./build/html'))
	})

	.task('compass', ()=> {
		gulp.src('dev/sass/**/*.sass')
			.pipe(watch('./dev/sass/**/*.sass'))
			.pipe(compass({
				config_file: 'config.rb',
				css: 'build/css',
				sass: 'dev/sass'
			}))
		.pipe(gulp.dest('dev/sass'))
	})
