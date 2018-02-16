window.addEventListener('scroll',function(){
    if(window.scrollY>0){      
      topNavBarIn.classList.add('stick');       
    }else{
      topNavBarIn.classList.remove('stick');
    }
  })