'use strict';

!function () {
  var view = document.querySelector('nav.menu');
  var controller = {
    view: null,
    init: function init(view) {
      this.view = view;
      this.initAnimation();
      this.bindEvents();
    },
    bindEvents: function bindEvents() {
      var _this = this;

      var aTags = view.querySelectorAll('nav.menu>ul>li>a');
      for (var i = 0; i < aTags.length; i++) {
        aTags[i].onclick = function (x) {
          x.preventDefault();
          var a = x.currentTarget;
          var href = a.getAttribute('href');
          var element = document.querySelector(href);
          _this.scrollToElement(element);
        };
      }
    },
    scrollToElement: function scrollToElement(element) {
      var top = element.offsetTop; //获取元素到页面顶部的距离
      var currentTop = window.scrollY;
      var t = Math.abs((top - 60 - currentTop) / 100);
      if (t > 5) {
        t = 5;
      } else if (t < 1) {
        t = 1;
      };
      var coords = { y: currentTop };
      var tween = new TWEEN.Tween(coords).to({ y: top - 60 }, t * 200).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function () {
        window.scrollTo(0, coords.y);
      }).start();
    },
    initAnimation: function initAnimation() {
      function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
      }
      requestAnimationFrame(animate);
    }
  };
  controller.init();
}.call();