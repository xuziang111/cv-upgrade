function fn(){
  let view = document.querySelector('#topNavBarIn')
  let controller = {
    view:null,
    init:function(view){
      this.view = view;
      this.bindEvents();
    },
    active:function(){
      view.classList.add('sticky');
    },
    deactive:function(){
      view.classList.remove('sticky');
    },
    bindEvents:function(){
      window.addEventListener('scroll',() => {
        if(window.scrollY>0){      
          this.active();       
        }else{
          this.deactive();
        }
      })
    }
  }
  controller.init();
}
export default fn
