'use strict';

!function () {
  var view = document.querySelector('#myWorks');
  var controller = {
    view: null,
    swiper: null,
    init: function init(view) {
      this.view = view;
      this.initSwiper();
    },
    swiperOptions: {
      autoplay: true,
      loop: true,
      pagination: {
        el: '.swiper-pagination'
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    },
    initSwiper: function initSwiper() {
      this.swiper = new Swiper(this.view.querySelector('.swiper-container'), this.swiperOptions);
    }
  };
  controller.init(view);
}.call();