const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");
const del = require("del");

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("styles.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
};

const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
  .pipe(
    imagemin([
    // imagemin.optipng({optimizationLevel: 3}),
    imagemin.mozjpeg({progressive: true}),
    imagemin.svgo()])
  )
  .pipe(gulp.dest("build/img"));
};

const createWebp = () => {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
};

const sprite = () => {
  return gulp.src("source/img/**/icon-*.svg")
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"));
};

const minHTML = () => {
  return gulp.src("source/*.html")
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest("build"));
};

const minifyJS = () => {
  return gulp.src("source/js/*.js")
  .pipe(uglify())
  .pipe(rename(function (path) {
    path.basename += ".min";
  }))
  .pipe(gulp.dest("build/js"));
};

const copy = () => {
  return gulp.src(["source/fonts/**/*.{woff,woff2}", "source/*.ico"], {
    base: "source"
  })
 .pipe(gulp.dest("build"));
};

const clean = () => {
  return del("build");
};

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html", gulp.series("minHTML"));
  gulp.watch("source/js/*.js", gulp.series("minifyJS"));
};

exports.styles = styles;
exports.images = images;
exports.createWebp = createWebp;
exports.sprite = sprite;
exports.minHTML = minHTML;
exports.minifyJS = minifyJS;
exports.copy = copy;
exports.clean = clean;
exports.server = server;

exports.build = gulp.series(clean, copy, styles, images, sprite, createWebp, minHTML, minifyJS);
exports.default = gulp.series(clean, copy, styles, images, sprite, createWebp, minHTML, minifyJS, server, watcher);
