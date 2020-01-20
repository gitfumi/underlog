/*
 * Javascriptの結合
 */
// **********************************************
// require
// **********************************************
const $ = require('../plugin');
const config = require('../config');

// **********************************************
// concat set
// **********************************************
module.exports = {
	taskConcat: () =>{
		return $.gulp.src(config.root.src + config.concat.targetFile)
			// ファイルを結合
			.pipe($.concat(config.concat.outPutFileName))
			.pipe($.gulp.dest(config.root.src + config.concat.outPutDir));
	}
}