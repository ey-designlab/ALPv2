var gulp = require('gulp'),
        sass = require('gulp-sass'),
        minifyHTML = require('gulp-htmlmin'),
        concat = require('gulp-concat'),
        browserSync = require('browser-sync').create(),
        plumber = require('gulp-plumber'),
        notify = require('gulp-notify'),
        imagemin = require('gulp-imagemin'),
        rename = require('gulp-rename'),
        minifyCss = require('gulp-cssnano'),
        uncss = require('gulp-uncss'),
        autoprefixer = require('gulp-autoprefixer'),
        uglify = require('gulp-uglify'),
        babel = require('gulp-babel'),
        cssimport = require('gulp-cssimport'),
//        sourcemaps = require('gulp-sourcemaps'),
        fileinclude = require('gulp-file-include'),
        addsrc = require('gulp-add-src'),
//        inline_base64 = require('gulp-inline-base64'),
        critical = require('critical').stream;
//        gulpbrowserify = require('gulp-browserify');

/* baseDirs: baseDirs for the project */

var baseDirs = {
    dist: 'dist/',
    src: 'src/',
    assets: 'dist/assets/'
};

/* routes: object that contains the paths */

var routes = {
    styles: {
        scss: baseDirs.src + 'styles/*.scss',
        _scss: baseDirs.src + 'styles/_includes/*.scss',
        css: baseDirs.assets + 'css/'
    },

    templates: {
        html: baseDirs.src + 'templates/*.html',
        htmlincludes: baseDirs.src + 'templates/_includes/',
        allhtml: baseDirs.src + 'templates/**/*.html'
    },

    scripts: {
        base: baseDirs.src + 'scripts/',
        js: [
            baseDirs.src + 'scripts/vendor/jquery.min.js',
            baseDirs.src + 'scripts/vendor/migrate.js',
            baseDirs.src + 'scripts/vendor/jquery.easing.min.js',
            baseDirs.src + 'scripts/vendor/jquery.mousewheel.min.js',
//            baseDirs.src + 'scripts/vendor/jquery.simplr.smoothscroll.js',
            baseDirs.src + 'scripts/vendor/waypoints.js',
            baseDirs.src + 'scripts/vendor/jquery.featureCarousel.min.js',
            baseDirs.src + 'scripts/vendor/jquery-ui-1.10.2.custom.min.js',
            baseDirs.src + 'scripts/vendor/filter.js',
            baseDirs.src + 'scripts/vendor/xepOnline.jqPlugin.js',
//            baseDirs.src + 'scripts/vendor/jspdf.min.js',
//            baseDirs.src + 'scripts/vendor/html2canvas.min.js',
            
            baseDirs.src + 'scripts/index.js'

        ],
        jsmin: baseDirs.assets + 'js/'
    },

    files: {
        html: 'dist/',
        images: baseDirs.src + 'images/**/*',
        baseimages: baseDirs.src + 'images',
        imgmin: baseDirs.assets + 'css/',
        cssFiles: baseDirs.assets + 'css/*.css',
        htmlFiles: baseDirs.dist + '*.html',
        styleCss: baseDirs.assets + 'css/style.css'
    },

    deployDirs: {
        baseDir: baseDirs.dist,
        baseDirFiles: baseDirs.dist + '**/*',
        ftpUploadDir: 'FTP-DIRECTORY'
    }
};

/* Compiling Tasks */

// Templating

gulp.task('templates', function (done) {
    return gulp.src(routes.templates.html)
            .pipe(fileinclude({
                prefix: '@@',
                basepath: routes.templates.htmlincludes
            }))
            .pipe(minifyHTML({collapseWhitespace: true}))
            .pipe(gulp.dest(routes.files.html))
            .pipe(browserSync.stream())
            .pipe(notify({
                title: 'HTML minified succesfully!',
                message: 'templates task completed.'
            }));
});

// SCSS

gulp.task('styles', function () {
    return gulp.src(routes.styles.scss)
            .pipe(plumber({
                errorHandler: notify.onError({
                    title: "Error: Compiling SCSS.",
                    message: "<%= error.message %>"
                })
            }))
//            .pipe(sourcemaps.init())
            .pipe(sass({
                outputStyle: 'compressed'
            }))
            .pipe(autoprefixer('last 5 versions'))
//            .pipe(inline_base64({
//                baseDir: "dist/assets/css/",
//                maxSize: 14 * 1024,
//                debug: true
//            }))
//            .pipe(sourcemaps.write())
            .pipe(cssimport({}))
            .pipe(rename('style.css'))
            .pipe(gulp.dest(routes.styles.css))
            .pipe(browserSync.stream())
            .pipe(notify({
                title: 'SCSS Compiled and Minified succesfully!',
                message: 'scss task completed.'
            }));
});

/* Scripts (js) ES6 => ES5, minify and concat into a single file.*/

gulp.task('scripts', function () {
    return gulp.src(routes.scripts.js)
            .pipe(plumber({
                errorHandler: notify.onError({
                    title: "Error: Babel and Concat failed.",
                    message: "<%= error.message %>"
                })
            }))
//            .pipe(sourcemaps.init())

            // .pipe(gulpbrowserify())
            .pipe(babel({
                presets: [
                    ["es2015", {"modules": false}]
                ]
            }))
            .pipe(concat('script.js'))
            .pipe(addsrc(baseDirs.src + 'scripts/*.js'))
            .pipe(uglify())
//            .pipe(sourcemaps.write())
            .pipe(gulp.dest(routes.scripts.jsmin))
            .pipe(browserSync.stream())
            .pipe(notify({
                title: 'JavaScript Minified and Concatenated!',
                message: 'your js files has been minified and concatenated.'
            }));
});

/* Image compressing task */

gulp.task('images', function () {
    gulp.src(routes.files.images)
            .pipe(imagemin())
            .pipe(gulp.dest(routes.files.imgmin));
});


/* Serving (browserSync) and watching for changes in files */

gulp.task('serve', function () {
    browserSync.init({
        server: './dist'
    });

    gulp.watch([routes.styles.scss, routes.styles._scss], ['styles']);

    gulp.watch(routes.templates.allhtml, ['templates']);
    gulp.watch(baseDirs.src + 'scripts/**/*.js', ['scripts']);
    gulp.watch(routes.files.images, ['images']);
    gulp.watch(routes.files.htmlFiles).on('change', browserSync.reload);

});

/* Optimize */

gulp.task('uncss', function () {
    return gulp.src(routes.files.cssFiles)
            .pipe(uncss({
                html: [routes.files.htmlFiles],
                ignore: ['*:*']
            }))
            .pipe(plumber({
                errorHandler: notify.onError({
                    title: "Error: UnCSS failed.",
                    message: "<%= error.message %>"
                })
            }))
            .pipe(minifyCss())
            .pipe(gulp.dest(routes.styles.css))
            .pipe(notify({
                title: 'Project Optimized!',
                message: 'UnCSS completed!'
            }));
});

/* Extract CSS critical-path */

gulp.task('critical', function () {
    return gulp.src(routes.files.htmlFiles)
            .pipe(critical({
                base: baseDirs.dist,
                inline: true,
                html: routes.files.htmlFiles,
                css: routes.files.styleCss,
                ignore: ['@font-face', /url\(/],
                width: 1300,
                height: 900
            }))
            .pipe(plumber({
                errorHandler: notify.onError({
                    title: "Error: Critical failed.",
                    message: "<%= error.message %>"
                })
            }))
            .pipe(gulp.dest(baseDirs.dist))
            .pipe(notify({
                title: 'Critical Path completed!',
                message: 'css critical path done!'
            }));
});

gulp.task('dev', ['templates', 'images', 'styles', 'scripts', 'serve']);
gulp.task('build', ['templates', 'styles', 'scripts', 'images']);
gulp.task('optimize', ['uncss', 'critical', 'images']);
gulp.task('deploy', ['optimize']);
gulp.task('default', function () {
    gulp.start('dev');
});
