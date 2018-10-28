'use strict';

const config = require('./gulpconfig.js');
const bs = require('browser-sync').create();
const cssmin = require('gulp-cssmin');
const concat = require('gulp-concat');
const del = require('del');
const imagemin = require('gulp-imagemin');
const gulp = require('gulp');
const notify = require('gulp-notify');
const prefix = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const uncss = require('gulp-uncss');

gulp.task('server', () => {
    bs.init({
        server: {
            baseDir: config.source,
        },
    });
    gulp.watch(config.html.watch).on('change', bs.reload);
});

gulp.task('html', () =>
    gulp.src(config.html.src)
        .pipe(gulp.dest(config.html.dest))
);

gulp.task('html:prod', () =>
    gulp.src(config.html.src)
        .pipe(gulp.dest(config.html.dest))
);

gulp.task('sass', () =>
    gulp.src(config.scss.src)
        .pipe(sass().on('error', notify.onError({title: 'sass'})))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.scss.dest))
        .pipe(bs.stream())
);

gulp.task('sass:prod', () =>
    gulp.src(config.scss.src)
        .pipe(uncss({html: [config.html.src]}))
        .pipe(prefix({browsers: ['last 2 versions'], cascade: true}))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.scss.prodDest))
        .pipe(bs.stream())
);

gulp.task('js', () =>
    gulp.src('./src/scripts/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./src'))
        .pipe(bs.stream())
);

gulp.task('js:prod', () =>
    gulp.src('./src/scripts/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./build'))
        .pipe(bs.stream())
);

gulp.task('watch', () => {
    gulp.watch('./src/*.html', ['html']);
    gulp.watch('./src/styles/**/*.scss', ['sass']);
    gulp.watch('./src/scripts/*.js', ['js']);
});

gulp.task('clean', () =>
    del(config.dest)
);

gulp.task('image', () =>
    gulp.src('./src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'))
);

gulp.task('fonts', () =>
    gulp.src('./src/fonts/*')
        .pipe(gulp.dest('./build/fonts'))
);

gulp.task('build', ['clean', 'html:prod', 'sass:prod', 'js', 'image', 'fonts']);

gulp.task('default', ['sass', 'js', 'server', 'watch']);