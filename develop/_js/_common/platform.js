// ユーザーエージェントを取得
let platform = (function() {
	let ua      = navigator.userAgent.toLowerCase(),
			matches = [],
			result  = {
					browser   : {
							name    : '',
							version : '',
							engine  : ''
					},
					os        : {
							name    : '',
							version : ''
					},
					isIE      : false,
					isEdge    : false,
					isFirefox : false,
					isSafari  : false,
					isChrome  : false,
					isOpera   : false,
					isSP      : false,
					isTablet  : false
			};

	// ブラウザ名とバージョン
	if (ua.match(/msie/) || ua.match(/trident/)) {
			result.browser.name = 'Internet Explorer';
			matches = ua.match(/(msie|rv:?)\s?([\d\.]+)/);

			if (matches && matches.length > 0 && matches[2]) {
					result.browser.version = matches[2];
			}
			result.isIE = true;
	} else if (ua.match(/mozilla\/.+windows nt 10\.[0-9].+chrome.+safari.+edge\/[0-9\.]+/i)) {
			result.browser.name = 'Edge';
			matches = ua.match(/mozilla\/.+windows nt 10\.[0-9].+chrome.+safari.+edge\/([0-9\.]+)/);

			if (matches && matches.length > 0 && matches[1]) {
					result.browser.version = matches[1];
			}
			result.isEdge = true;
	} else if (ua.match(/opera|opr/)) {
			result.browser.name = 'Opera';

			if (ua.match(/version\//)) {
					matches = ua.match(/version\/([\d\.]+)/);
					if (matches && matches.length > 0 && matches[1]) {
							result.browser.version = matches[1];
					}
			} else {
					matches = ua.match(/(opera(\s|\/)|opr\/)([\d\.]+)/);
					if (matches && matches.length > 0 && matches[3]) {
							result.browser.version = matches[3];
					}
			}
			result.isOpera = true;
	} else if (ua.match(/firefox/)) {
			result.browser.name = 'Firefox';
			matches = ua.match(/firefox\/([\d\.]+)/);

			if (matches && matches.length > 0 && matches[1]) {
					result.browser.version = matches[1];
			}
			result.isFirefox = true;
	} else if (ua.match(/chrome/)) {
			result.browser.name = 'Chrome';
			matches = ua.match(/chrome\/([\d\.]+)/);

			if (matches && matches.length > 0 && matches[1]) {
					result.browser.version = matches[1];
			}
			result.isChrome = true;
	} else if (ua.match(/safari/)) {
			result.browser.name = 'Safari';
			matches = ua.match(/version\/([\d\.]+)/);

			if (matches && matches.length > 0 && matches[1]) {
					result.browser.version = matches[1];
			}
			result.isSafari = true;
	} else {
			result.browser.name = 'Unknown';
	}

	// ブラウザレンダリングエンジン
	if (ua.match(/trident/)) {
			result.browser.engine = 'Trident';
	} else if (ua.match(/blink/)) {
			result.browser.engine = 'Blink';
	} else if (ua.match(/webkit/)) {
			result.browser.engine = 'Webkit';
	} else if (ua.match(/khtml/)) {
			result.browser.engine = 'KHTML';
	} else if (ua.match(/gecko/)) {
			result.browser.engine = 'Gecko';
	} else if (ua.match(/presto/)) {
			result.browser.engine = 'Presto';
	} else {
			result.browser.engine = 'Unknown';
	}

	// OS名とバージョン
	if (ua.match(/windows phone/)) {
			result.os.name = 'Windows Phone';
	} else if (ua.match(/windows/)) {
			result.os.name = 'Windows';
			matches = ua.match(/windows nt ([\d\.]+)/);
			if (matches && matches.length > 0 && matches[1]) {
					if (matches[1].match(/10\.[0-9]/)) {
							result.os.version = matches[1];
					} else if (matches[1] === '6.3') {
							result.os.version = '8.1';
					} else if (matches[1] === '6.2') {
							result.os.version = '8.0';
					} else if (matches[1] === '6.1') {
							result.os.version = '7';
					} else if (matches[1] === '6.1') {
							result.os.version = '7';
					} else if (matches[1] === '6.0') {
							result.os.version = 'Vista';
					} else if (matches[1] === '5.2' || matches[1] === '5.1') {
							result.os.version = 'XP';
					} else if (matches[1] === '5.0') {
							result.os.version = '2000';
					}
			}
			matches = ua.match(/windows ([\d]+)/);
			if (matches && matches.length > 0 && matches[1]) {
					if (matches[1] === '98' && ua.match(/9x/)) {
							result.os.version = 'Me';
					} else if (matches[1] === '98') {
							result.os.version = '98';
					} else if (matches[1] === '95') {
							result.os.version = '95';
					} else if (matches[1] === '3.1') {
							result.os.version = '3.1';
					}
			}

	} else if (ua.match(/ios|iphone|ipad|ipod/)) {
			result.os.name = 'iOS';
			matches = ua.match(/((iphone)? os) ([\d_]+)/);
			if (matches && matches.length > 0 && matches[3]) {
					result.os.version = matches[3].replace(/_/g, '.');
			}
	} else if (ua.match(/mac os|mac_powerpc|macintosh/)) {
			result.os.name = 'Macintosh';
	} else if (ua.match(/android/)) {
			result.os.name = 'Android';
			matches = ua.match(/android ([\d\.]+)/);
			if (matches && matches.length > 0 && matches[1]) {
					result.os.version = matches[1];
			}
	} else if (ua.match(/linux/)) {
			result.os.name = 'Linux';
	} else if (ua.match(/firefox/) && ua.match(/mobile|tablet/)) {
			result.os.name = 'Firefox OS';
	} else {
			result.os.name = 'Unknown';
	}

	// デバイス判定
	if (ua.match(/iphone/) || ua.match(/ipod/) || ua.match(/android/) && ua.match(/mobile/) || ua.match(/windows phone/)) {
			result.isSP = true;
			$('body').addClass('is-sp');
	} else if (ua.match(/ipad/) || ua.match(/android/) && !ua.match(/mobile/)) {
			result.isTablet = true;
	}
	return result;
})();
export default platform;