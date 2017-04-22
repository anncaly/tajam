'use strict';

var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglifyjs'),
    cssnano      = require('gulp-cssnano'),
    rename       = require('gulp-rename'),
    del          = require('del'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    cache        = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    mainBowerFiles = require('main-bower-files'),
    spritesmith = require('gulp.spritesmith');

gulp.task('sass', function() {
    return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function() {
    return gulp.src('src/*.html')
    .pipe(gulp.dest('build'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function() {
    // return gulp.src([
    //    'src/libs/jquery/dist/jquery.min.js'
    // ])
    // .pipe(concat('libs.min.js'))
    // .pipe(uglify())
    // .pipe(gulp.dest('build/js'));
    gulp.src(mainBowerFiles(['**/*.js'],{
        "overrides": {
            "jquery": {
                "main": [
                    "dist/jquery.min.js"
                ]
             },
             "owl.carousel": {
                "main": [
                    "./dist/owl.carousel.min.js"
                ]
             },
             "matchHeight": {
                "main": [
                    "./dist/jquery.matchHeight-min.js"
                ]
             }
        }            
    }))
        .pipe(gulp.dest('./build/js'));
});

gulp.task('css-libs', ['sass'], function() {
    // return gulp.src('build/css/libs.css')
    //  .pipe(cssnano())
    //  .pipe(rename({suffix: '.min'}))
    //  .pipe(gulp.dest('build/css'));
    gulp.src(mainBowerFiles(['**/*.css'], {
        "overrides": {
            "owl.carousel": {
                "main": [
                    "./dist/assets/owl.carousel.min.css",
                    "./dist/assets/owl.theme.default.min.css"
                ]
             }
        }            
    }))
        .pipe(gulp.dest('build/css'))
});

gulp.task('sprite', function () {
  // var spriteData = gulp.src('src/img/icons/*.png')
  // .pipe(spritesmith({
  //   imgName: 'icons.png',
  //   cssName: '_icons.scss',
  //   algorithm: 'diagonal',
  //   imgPath: '../img/sprites/icons.png' 
  // }))
  var spriteData = gulp.src('src/img/socials/*.png')
  .pipe(spritesmith({
    imgName: 'socials.png',
    cssName: '_socials.scss',
    algorithm: 'diagonal',
    imgPath: '../img/sprites/socials.png' 
  }))
  // var spriteData = gulp.src('src/img/small_icons/*.png')
  // .pipe(spritesmith({
  //   imgName: 'small_icons.png',
  //   cssName: '_small_icons.scss',
  //   algorithm: 'diagonal',
  //   imgPath: '../img/sprites/small_icons.png' 
  // }))
  spriteData.img.pipe(gulp.dest('src/img/sprites'))
  spriteData.css.pipe(gulp.dest('src/scss'));
});

gulp.task('browser-sync', function() {
   browserSync({
     server: {
         baseDir: 'build'
      },
      notify: false
   });
});

gulp.task('clean', function() {
    return del.sync('build');
});

gulp.task('clear', function() {
    return cache.clearAll();
});

gulp.task('img', function() {
    return gulp.src('src/img/**/*')
    .pipe(cache(imagemin({
        interlaced: true,
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    })))
    .pipe(gulp.dest('build/img'));
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function() {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/*.html', ['html'], browserSync.reload);
    // gulp.watch('src/**/*.html', browserSync.reload);
    // gulp.watch('src/*.html').on('change', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['clean', 'img', 'sass', 'css-libs', 'scripts'], function() {
    var buildCss = gulp.src([
        'build/css/main.css',
        'build/css/libs.min.css'
        ])
        .pipe(gulp.dest('build/css'));
    
    var buildFonts = gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('build/fonts'));
    
    var buildJs = gulp.src('src/js/**/*')
        .pipe(gulp.dest('build/js'));
    
    var buildHtml = gulp.src('src/*.html')
        .pipe(gulp.dest('build'));
}); 