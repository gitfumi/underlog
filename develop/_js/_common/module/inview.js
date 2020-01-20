// 要素が見えたらclassを付与
let inView = (function() {

	// ターゲット指定
	let targetOnly = document.querySelectorAll('.js-inView')
	let targets = document.querySelectorAll('.js-inViews')
	// IE用のエラー回避のため配列に変換
	targetOnly = Array.prototype.slice.call(targetOnly,0);
	targets = Array.prototype.slice.call(targets,0);

	// オプション
	const options = {
		rootMargin: "-50% 0px", // 上下-100px手前で発火
		// rootMargin: "0px 0px 0px 0px", // 上下-100px手前で発火
		// threshold: 0.5 // ターゲットがどのくらいの割合で見えているかを示す
	};

	// 初期化
	const observer = new IntersectionObserver(callback, options);

	// 1つだけ要素
	targetOnly.forEach(function(el) {
		// 監視の開始
		observer.observe(el);
	});
	// 1つだけ要素
	targets.forEach(function(el) {
		// 監視の開始
		let els = el.querySelectorAll(':scope > *')
		els = Array.prototype.slice.call(els,0)
		els.forEach(function(el2) {
			observer.observe(el2);
		});
	});

	// コールバック
	function callback(entries, object) {
		entries.forEach(function(entry) {

			// ターゲット要素
			const targetEl = entry.target;
			const $inviewElParent = $('#js-inviewAnchor')
			// console.log(entry);

			// 交差していない場合
			if (!entry.isIntersecting){
				$(targetEl).removeClass('is-inview')
				$inviewElParent.find('.'+targetEl.id).removeClass('is-inview')
			}else{

				// ターゲットにクラスを追加
				$(targetEl).addClass('is-inview')
				$inviewElParent.find('.'+targetEl.id).addClass('is-inview')
				// 監視の解除
				// object.unobserve(entry.target);
			}
		});
	};
}());
export default inView;
