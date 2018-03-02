function fn(){
  let view = document.querySelector('nav.menu');
  let controller = {
    view:null,
    init:function(view){
      this.view = view;
      this.initAnimation()
      this.bindEvents()
    },
    bindEvents:function(){
      let aTags = view.querySelectorAll('nav.menu>ul>li>a');
      for(let i=0;i<aTags.length;i++){
        aTags[i].onclick = (x) => {
        x.preventDefault();
        let a = x.currentTarget;
        let href = a.getAttribute('href');
        let element = document.querySelector(href);
        this.scrollToElement(element);
        }
      }
    },
    scrollToElement:function(element){
      let top = element.offsetTop;//获取元素到页面顶部的距离
      let currentTop = window.scrollY;
      let t = Math.abs((top- 60 - currentTop)/100)
      if(t>5){
        t=5
      }else if(t<1){
        t=1
      };
      let coords = { y: currentTop }; 
      let tween = new TWEEN.Tween(coords) 
        .to({y: (top- 60) }, t*200) 
        .easing(TWEEN.Easing.Quadratic.InOut) 
        .onUpdate(function() {             
          window.scrollTo(0,coords.y)
         })
      .start(); 
    },
    initAnimation:function(){
      function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
      }
      requestAnimationFrame(animate);
    },
  }
  controller.init()
}
export default fn
