var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
// less编译 压缩
gulp.task('style',function(){
gulp.src(['src/styles/*.less','!src/styles/_*.less'])
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest('dist/styles/'))
	.pipe(browserSync.reload(
		{stream:true}
		));
});
//js合并，压缩混淆
gulp.task('script',function(){
	gulp.src('src/script/*.js')
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/script'))
	.pipe(browserSync.reload({stream:true}));
});
// 图片复制
gulp.task('image',function(){
	gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/images'))
		.pipe(browserSync.reload({stream:true}));

});
// html的处理
var htmlmin = require('gulp-htmlmin');
gulp.task('html',function(){
	gulp.src('src/*.html')
	.pipe(htmlmin({
		collapseWhitespace: true,
		removeComments:true
	}))
	.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({stream:true}));
		// 监听如果有更新的话，会自动下载更新
});
// 进行监测，
var browserSync = require('browser-sync');
gulp.task('serve',function(){
	browserSync({
		server: {
			baseDir:['dist']
		}
	}, function(err, bs) {
    console.log(bs.options.getIn(["urls", "local"]));
});
	// watch监视文件，并且可以在文件发生改动时候做一些事情。
	gulp.watch('src/styles/*.less',['style']);
	gulp.watch('src/script/*.js',['script']);
	gulp.watch('src/images/*.*',['image']);
	gulp.watch('src/*.html',['html']);

});