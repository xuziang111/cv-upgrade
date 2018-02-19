!function(){
  var view = document.querySelector('#topNavBarIn')
  var controller = {
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
}.call()
