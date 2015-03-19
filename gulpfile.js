/**
 * Created by Leandro Rolim on 18/03/15.
 */

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var server = require('gulp-server-livereload');
var csslint = require('gulp-csslint');
var minifyCSS = require('gulp-minify-css');


var origem = "./src";
var destino = "./dist";

gulp.task('css', function() {
    gulp.src(destino+'/**/*.css')
        .pipe(csslint())
        .pipe(csslint.reporter());
});

gulp.task('server', function() {
    gulp.src(destino)
        .pipe(server({
            livereload: true,
            open: true,
            defaultFile: "guia.html"
        }));
});

gulp.task('jslint', function() {
    gulp.src(origem+"/js/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('sass', function () {
    gulp.src(origem+'/scss/template.scss')
        .pipe(sass())
        .pipe(gulp.dest(destino+'/css'));
});

gulp.task('minify-css', function() {
    return gulp.src(destino+"/css/template.css")
        .pipe(minifyCSS({keepBreaks:false}))
        .pipe(rename('template.min.css'))
        .pipe(gulp.dest(destino+"/css"));
});

gulp.task('dist', function() {
    gulp.src(origem+"/js/*.js")
        .pipe(concat(destino))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(destino+"/js"));
});

gulp.task('default',['jslint', 'sass', 'minify-css', 'dist', 'css','server'], function() {
    gulp.watch(origem+"/**/*", ['jslint', 'sass', 'minify-css', 'dist', 'css']);
});