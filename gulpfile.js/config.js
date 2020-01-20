// **********************************************
// 初期変数設定
// **********************************************
module.exports = {
	/*******************
	 init
	********************/
	host: 'underlog.dev.localhost',
	root: {
		src: 'develop',
		dest: 'trunk',
		temp: '_temp'
	},
	browserSync: {
		viewPage: '',
		reload: 'css|html|php|js|pug',
		noReload: '_js'
	},
	activeFile: {
		path: '',
		event: ''
	},
	/*******************
	 watch.js
	********************/
	sass: {
		targetFile: '/_sass/**/*.+(sass|scss)'
	},
	babelify: {
		targetFile: '/_js/_common/**/*.js',
		outPutDir: '/js/',
		outPutFileName: 'common.js'
	},
	/*******************
	 js_concat.js
	********************/
	concat: {
		targetFile: '/_js/_plugin/**/*.js',
		outPutDir: '/js/',
		outPutFileName: 'plugin.js'
	},
	/*******************
	 sass.js
	********************/
	plumber: {
		errorMessage: 'Error: <%= error.message %>'
	},
	/*******************
	 babelify.js
	********************/
	browserify: {
		targetFile: '/_js/_common/_app.js'
	},
	/*******************
	 pug.js
	********************/
	pug: {
		targetFile: '/_pug/html/**/*.pug',
		targetOther: [
			'/_pug/_function/**/*.pug',
			'/_pug/_inc/**/*.pug',
			'/_pug/_json/**/*.json'
		]
	},
	/*******************
	 imagemin.js
	********************/
	imagemin: {
		targetFile: '/**/*.+(jpg|png|svg)'
	},
	/*******************
	 frontnone.js
	********************/
	frontnone: {
		targetFile: [
			'/_sass/_object/component/**/*.+(sass|scss)',
			'/_sass/_object/module/**/*.+(sass|scss)'
			// '/_sass/_object/utility/**/*.scss
		],
		outPutDir: '/_styleguide',
		includeCss: '../css/base.css'
	},
	/*******************
	 _release_clean.js
	********************/
	clean: {
		targetFile: [
			'/**/*',
			'/**/.*',
			'/**'
		]
	},
	/*******************
	 _release_copy.js
	********************/
	copy: {
		escapeFile: [
			'/**/*.htaccess',
			'/**/*.+(sass|scss)',
			'/**/_pug/**/*.*',
			'/**/_js/**/*.*',
			// '/**/js/_common/**/*.*',
			// '/**/js/_plugin/**/*.*',
			'/**/_styleguide/**/*.*',
			'/**/font/demo/**/*.*',
			// '/**/_mt/**/*.*',
			'/**/_wp/**/*.*',
			// '/**/assets_c/**/*.*',
		],
		escapeFileWP: [
			'/**/_wp/wp-content/themes/index.php'
		]
	},
	/*******************
	 delete.js
	********************/
	delete: {
		targetHtmlFile: /_pug\\html\\(.*).pug$/,
		targetSassFile: /_sass\\(.*).+(sass|scss)$/
	}
};