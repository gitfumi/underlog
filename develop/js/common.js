(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.exportFunc = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _inview = _interopRequireDefault(require("./module/inview.js"));

var _current_link = _interopRequireDefault(require("./module/current_link.js"));

var _add_tap_class = _interopRequireDefault(require("./module/add_tap_class.js"));

var _scroll_anchor = _interopRequireDefault(require("./module/scroll_anchor.js"));

var _on_portrait_change = _interopRequireDefault(require("./module/on_portrait_change.js"));

var _menu_slide = _interopRequireDefault(require("./module/menu_slide.js"));

var _on_media_query = _interopRequireDefault(require("./on_media_query.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

},{"./module/add_tap_class.js":2,"./module/current_link.js":3,"./module/inview.js":4,"./module/menu_slide.js":5,"./module/on_portrait_change.js":6,"./module/scroll_anchor.js":7,"./on_media_query.js":8}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// タッチデバイスで:hoverを再現
var addTapClass = function () {
  $(document).on(window.ontouchstart === null ? 'touchstart' : 'mouseenter', 'a, button, .js-hover', function () {
    $(this).addClass('is-hover');
  }).on(window.ontouchend === null ? 'touchend' : 'mouseleave', 'a, button, .js-hover', function () {
    var self = this;
    setTimeout(function () {
      $(self).removeClass('is-hover');
    }, 100);
  });
}();

var _default = addTapClass;
exports["default"] = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// コンテンツの表示、非表示
var currentLink = function () {
  return {
    Uri: function Uri(path) {
      var self = this;
      this.originalPath = path; //絶対パスを取得

      this.absolutePath = function () {
        var e = document.createElement('span');
        e.innerHTML = '<a href="' + path + '" />';
        return e.firstChild.href;
      }(); //絶対パスを分解


      var fields = {
        'schema': 2,
        'username': 5,
        'password': 6,
        'host': 7,
        'path': 9,
        'query': 10,
        'fragment': 11
      };
      var r = /^((\w+):)?(\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/.exec(this.absolutePath);

      for (var field in fields) {
        this[field] = r[fields[field]];
      }

      this.querys = {};

      if (this.query) {
        $.each(self.query.split('&'), function () {
          var a = this.split('=');
          if (a.length == 2) self.querys[a[0]] = a[1];
        });
      }
    },
    selflink: function selflink(options) {
      var c = $.extend({
        selfLinkAreaSelector: 'body',
        selfLinkClass: 'is-current',
        parentsLinkClass: 'is-parents',
        postfix: '_on',
        changeImgSelf: false,
        changeImgParents: false
      }, options);
      $(c.selfLinkAreaSelector + (c.selfLinkAreaSelector ? ' ' : '') + 'a[href]').each(function () {
        var href = new currentLink.Uri(this.getAttribute('href'));
        var setImgFlg = false;

        if (href.absolutePath == location.href && !href.fragment) {
          //同じ文書にリンク
          $(this).addClass(c.selfLinkClass);
          setImgFlg = c.changeImgSelf;
        } else if (0 <= location.href.search(href.absolutePath)) {
          //親ディレクトリリンク
          $(this).addClass(c.parentsLinkClass);
          setImgFlg = c.changeImgParents;
        }

        if (setImgFlg) {
          //img要素が含まれていたら現在用画像（_cr）に設定
          $(this).find('img').each(function () {
            this.originalSrc = $(this).attr('src');
            this.currentSrc = this.originalSrc.replace(new RegExp('(' + c.postfix + ')?(\.gif|\.jpg|\.png)$'), c.postfix + "$2");
            $(this).attr('src', this.currentSrc);
          });
        }
      });
    }
  };
}();

var _default = currentLink;
exports["default"] = _default;
currentLink.selflink();

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// 要素が見えたらclassを付与
var inView = function () {
  // ターゲット指定
  var targetOnly = document.querySelectorAll('.js-inView');
  var targets = document.querySelectorAll('.js-inViews'); // IE用のエラー回避のため配列に変換

  targetOnly = Array.prototype.slice.call(targetOnly, 0);
  targets = Array.prototype.slice.call(targets, 0); // オプション

  var options = {
    rootMargin: "-50% 0px" // 上下-100px手前で発火
    // rootMargin: "0px 0px 0px 0px", // 上下-100px手前で発火
    // threshold: 0.5 // ターゲットがどのくらいの割合で見えているかを示す

  }; // 初期化

  var observer = new IntersectionObserver(callback, options); // 1つだけ要素

  targetOnly.forEach(function (el) {
    // 監視の開始
    observer.observe(el);
  }); // 1つだけ要素

  targets.forEach(function (el) {
    // 監視の開始
    var els = el.querySelectorAll(':scope > *');
    els = Array.prototype.slice.call(els, 0);
    els.forEach(function (el2) {
      observer.observe(el2);
    });
  }); // コールバック

  function callback(entries, object) {
    entries.forEach(function (entry) {
      // ターゲット要素
      var targetEl = entry.target;
      var $inviewElParent = $('#js-inviewAnchor'); // console.log(entry);
      // 交差していない場合

      if (!entry.isIntersecting) {
        $(targetEl).removeClass('is-inview');
        $inviewElParent.find('.' + targetEl.id).removeClass('is-inview');
      } else {
        // ターゲットにクラスを追加
        $(targetEl).addClass('is-inview');
        $inviewElParent.find('.' + targetEl.id).addClass('is-inview'); // 監視の解除
        // object.unobserve(entry.target);
      }
    });
  }

  ;
}();

var _default = inView;
exports["default"] = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _valiable = _interopRequireDefault(require("../valiable.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// スライドメニュー
var menuSlide = function menuSlide() {
  var $body = $('body');
  var $header = $('#header');
  var $globalNav = $('#globalNav');
  var headerHeight = $header.outerHeight();
  var $cloneNav = $globalNav.clone(true);
  $body.append('<div id="slideMenu"></div>');
  $cloneNav.appendTo('#slideMenu');
  $header.append('<div id="btnMenu"><p><span class="icoMenu"><span class="icoMenuInner"></span></span></p></div>');
  var $slideMenu = $('#slideMenu');
  var slideMenuHeight = $slideMenu.height();
  var scrollY;
  $slideMenu.css('top', headerHeight);
  hideSlideMenu();
  $('#btnMenu').on('click', function () {
    $(this).children().toggleClass('is-active');

    if ($slideMenu.hasClass('is-show')) {
      hideSlideMenu();
    } else {
      showSlideMenu();
      getSlideMenuHeight();
    }
  });
  $slideMenu.find('#globalNav li a').on('click', function () {
    $('#btnMenu').children().removeClass('is-active');
    hideSlideMenu();
  });
  $globalNav.find('span').on('click', function () {
    getSlideMenuHeight();
  }); // 開く

  function showSlideMenu() {
    scrollY = $(window).scrollTop();
    _valiable["default"].isMenuShow = true;
    $slideMenu.removeClass('is-hide').addClass('is-show').velocity('stop').velocity({
      translateY: 0
    }, {
      display: 'block'
    });
  } // 閉じる


  function hideSlideMenu() {
    $slideMenu.removeClass('is-show').addClass('is-hide').css('height', 'auto').velocity('stop').velocity({
      translateY: '-100%'
    }, {
      display: 'none'
    });
    $body.removeAttr('style');
    $('html, body').prop({
      scrollTop: scrollY
    });
  } // ナビの高さを調整


  function getSlideMenuHeight() {
    if (_valiable["default"].isMenuShow) {
      var windowHeigth = $(window).height(); // ウィンドウの高さよりナビの高さが大きかったら

      $slideMenu.css({
        'height': windowHeigth - headerHeight + 'px',
        'overflow-y': 'scroll',
        '-webkit-overflow-scrolling': 'touch'
      });
      $body.css({
        'position': 'fixed',
        'width': '100%',
        'top': '-' + scrollY + 'px'
      });
    }
  }
};

var _default = menuSlide;
exports["default"] = _default;

},{"../valiable.js":9}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/*
 * ランドスケープからポートレートに変更時にリロード
 */
var onPortraitChange = function () {
  $(window).on('orientationchange', function () {
    if (Math.abs(window.orientation) != 90) {
      location.reload();
    }
  });
}();

var _default = onPortraitChange;
exports["default"] = _default;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// 指定のアンカー要素までスクロール
var scrollAnchor = function () {
  var $win = $(window);
  var $doc = $(document);
  var $scrollElement = getFirstScrollable('html,body');
  var $header = $('#header');
  var mousewheel = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
  var SCROLL_SPEED = 800;
  var SCROLL_EASING = 'easeOutQuint';
  var NO_SCROLL_CLASS = 'js-noScroll';
  var PAGE_TOP_HASH = '#top'; // aタグのクリック

  $doc.on('click', 'a[href^="#"]', function (e) {
    var $self = $(this);
    var target = this.hash;
    var top;
    var buffer; // リンク先が#topの場合

    if (target == PAGE_TOP_HASH) {
      // ページの先頭へスクロール
      top = 0;
    } // リンク先が#topではない場合
    else {
        // 指定した要素が存在しない場合、a要素にclass（js-noScroll）を指定してた場合は未処理とする
        if ($(target).length < 1 || $self.hasClass(NO_SCROLL_CLASS)) return false;

        if ($header.outerHeight() == $win.outerHeight()) {
          buffer = 130;
        } else {
          buffer = $header.outerHeight() + 10;
        } // スクロール先の座標を調整する


        top = $(target).offset().top - buffer;
        top = Math.min(top, $doc.height() - $win.height());
      } // ウィールイベントをキャンセルしておく


    $doc.on(mousewheel, function (e) {
      e.preventDefault();
    }); // アニメーションの実行

    $scrollElement.stop().animate({
      scrollTop: top
    }, SCROLL_SPEED, SCROLL_EASING, function () {
      $doc.off(mousewheel);
    });
    return false;
  }); // htmlとbody、どちらかスクロール可能な要素を取得

  function getFirstScrollable(selector) {
    var $scrollable;
    $(selector).each(function () {
      var $self = $(this);

      if ($self.scrollTop() > 0) {
        $scrollable = $self;
        return false;
      } else {
        $self.scrollTop(1);

        if ($self.scrollTop() > 0) {
          $scrollable = $self;
          return false;
        }

        $self.scrollTop(0);
      }
    });
    return $scrollable;
  }
}();

var _default = scrollAnchor;
exports["default"] = _default;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _menu_slide = _interopRequireDefault(require("./module/menu_slide.js"));

var _scroll_anchor = _interopRequireDefault(require("./module/scroll_anchor.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// メディアクエリでjsを切り替え
var onMediaQuery = function () {
  var $window = $(window);
  var $body = $('body');
  var $header = $('#header');
  var breadcrumbsScroll;
  var queries = [{
    context: ['pc', 'minipc'],
    match: function match() {},
    unmatch: function unmatch() {}
  }, {
    context: ['tablet', 'phablet', 'sp'],
    match: function match() {},
    unmatch: function unmatch() {}
  }, {
    context: ['phablet', 'sp'],
    match: function match() {
      (0, _menu_slide["default"])();
    },
    unmatch: function unmatch() {
      $body.removeAttr('style');
      $('#btnMenu').remove();
      $('#slideMenu').remove();
    }
  }];
  MQ.init(queries);
}();

var _default = onMediaQuery;
exports["default"] = _default;

},{"./module/menu_slide.js":5,"./module/scroll_anchor.js":7}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// 共通変数
var valiable = function () {
  return {
    isMenuShow: false
  };
}();

var _default = valiable;
exports["default"] = _default;

},{}]},{},[1])(1)
});
