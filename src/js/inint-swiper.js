function fn(){
  let view = document.querySelector('#myWorks')
  let controller = {
    view:null,
    swiper:null,
    init:function(view){
      this.view = view;
      this.initSwiper()
    },
    swiperOptions:{
      autoplay: true,
      loop:true,
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    },
    initSwiper:function(){
      this.swiper = new Swiper (
        this.view.querySelector('.swiper-container'), 
        this.swiperOptions
      )
    },
  }
  controller.init(view);
}
export default fn