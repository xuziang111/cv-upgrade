works1.onclick=function(){
  worksBar.className='state1';
};
works2.onclick=function(){
  worksBar.className='state2';
};
works3.onclick=function(){
  worksBar.className='state3';
};
window.onscroll=function(){
  if(window.scrollY>0){      
    topNavBarIn.classList.add('stick');       
  }else{
    topNavBarIn.classList.remove('stick');
  }
}  
let liTags = document.getElementsByTagName('LI');  
for(let i=0;i<liTags.length;i++){
  liTags[i].onmouseenter = function (x) {
    x.currentTarget.classList.add('active');
 }
 liTags[i].onmouseleave= function (x) {
    x.currentTarget.classList.remove('active');
 }
}

let aTags = document.querySelectorAll('nav>ul>li>a');
for(let i=0;i<aTags.length;i++){
  aTags[i].onclick = function(x) {
  x.preventDefault();
  let top = document.querySelector(x.currentTarget.getAttribute('href')).offsetTop;
  let j=0,n = 25;
  let duration = 500/n;
  let currentTop = window.scrollY;
  let distance = (top- 60 - currentTop)/n;
  let xx = setInterval(()=>{
      window.scrollTo(0,currentTop + distance * j);
      j++;
      if(j===n+1){
        window.clearInterval(xx);
        return
      }
  },duration)

  }
}


loading.classList.remove('loading');


