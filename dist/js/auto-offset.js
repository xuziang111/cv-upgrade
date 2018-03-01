'use strict';

!function () {
  window.addEventListener('scroll', function () {
    findClosest();
  });

  function findClosest() {
    var specialTags = document.querySelectorAll('[data-y]');
    var minIndex = 0;
    for (var i = 1; i < specialTags.length; i++) {
      if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
        minIndex = i;
      }
    }
    // minIndex 就是里窗口顶部最近的元素
    specialTags[minIndex].classList.add('offset');
    var id = specialTags[minIndex].id;
    var a = document.querySelector('a[href="#' + id + '"]');
    var li = a.parentNode;
    var brothersAndMe = li.parentNode.children;
    for (var _i = 0; _i < brothersAndMe.length; _i++) {
      brothersAndMe[_i].classList.remove('highlight');
    }
    li.classList.add('highlight');
  }
  var liTags = document.querySelectorAll('nav > ul > li');
  for (var i = 0; i < liTags.length; i++) {
    liTags[i].onmouseenter = function (x) {
      x.currentTarget.classList.add('active');
    };
    liTags[i].onmouseleave = function (x) {
      x.currentTarget.classList.remove('active');
    };
  }
}.call();