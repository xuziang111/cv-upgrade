'use strict';

!function () {
  var view = document.querySelector('#topNavBarIn');
  var controller = {
    view: null,
    init: function init(view) {
      this.view = view;
      this.bindEvents();
    },
    active: function active() {
      view.classList.add('sticky');
    },
    deactive: function deactive() {
      view.classList.remove('sticky');
    },
    bindEvents: function bindEvents() {
      var _this = this;

      window.addEventListener('scroll', function () {
        if (window.scrollY > 0) {
          _this.active();
        } else {
          _this.deactive();
        }
      });
    }
  };
  controller.init();
}.call();