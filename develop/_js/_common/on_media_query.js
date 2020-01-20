// メディアクエリでjsを切り替え
import menuSlide     from './module/menu_slide.js';
import scrollAnchor from './module/scroll_anchor.js';

let onMediaQuery = (function() {
	let $window = $(window);
	let $body   = $('body');
	let $header = $('#header');
	let breadcrumbsScroll;
	let queries = [
		{
			context: ['pc', 'minipc'],
			match: function() {
			},
			unmatch: function() {
			}
		},
		{
			context: ['tablet', 'phablet', 'sp'],
			match: function() {
			},
			unmatch: function() {
			}
		},
		{
			context: ['phablet', 'sp'],
			match: function() {
				menuSlide()
			},
			unmatch: function() {
				$body.removeAttr('style');
				$('#btnMenu').remove();
				$('#slideMenu').remove();
			}
		}
	];
	MQ.init(queries);
}());
export default onMediaQuery;