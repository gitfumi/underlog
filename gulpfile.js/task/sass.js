/*
 * SASS
 */
// **********************************************
// require
// **********************************************
const $ = require('../plugin');
const config = require('../config');
// **********************************************
// SASS set
// **********************************************
module.exports = {

	/* --------------------
		 通常のSASSタスク
	----------------------*/
	taskSass: () => {
		console.log(config.activeFile.path);

		let path = config.root.src + config.sass.targetFile,
				option = { sourcemaps: true };

		// /_sass/css/の個別ファイルの場合ビルド対象反映を変更。
		if (config.activeFile.path.match(/_sass\\css/)){
			if (!config.activeFile.path.match(/\\_entry\\/)){
				path = config.activeFile.path;
				option = {base: './develop/_sass', sourcemaps: true};
				console.log('change!!!!!!!!!!');
			}
		}

		return $.gulp
		// ファイルのビルド
		.src(path, option)
		// 関連ファイルのみビルド
		.pipe($.progeny())
		// エラーが起こっても停止させない
		.pipe($.plumber({
			errorHandler: $.notify.onError(config.plumber.errorMessage)
		}))
		// ディレクトリ単位でのsassのimportを可能にする
		.pipe($.sassGlob())
		// sassのコンパイル
		.pipe($.sass({
			outputStyle: 'expanded'
		}))
		// ベンダープレフィックスの付与
		.pipe($.postCss(
			[
				$.autoprefixer({
					grid: true
				})
			]
		))
		.pipe($.gulp.dest(config.root.src, { sourcemaps: true }));
	},

	/* --------------------
		 Release時のSASSタスク
	----------------------*/
	taskSassAll: () => {
		return $.gulp
		.src(config.root.src + config.sass.targetFile, { sourcemaps: true })
		// エラーが起こっても停止させない
		.pipe($.plumber({
			errorHandler: $.notify.onError(config.plumber.errorMessage)
		}))
		// ディレクトリ単位でのsassのimportを可能にする
		.pipe($.sassGlob())
		// sassのコンパイル
		.pipe($.sass({
			outputStyle: 'expanded'
		}))
		// ベンダープレフィックスの付与
		.pipe($.postCss(
			[
				$.autoprefixer({
					grid: true
				})
			]
		))
		.pipe($.gulp.dest(config.root.src, { sourcemaps: true }));
	}
}