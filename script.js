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
  let a = x.currentTarget;
  let href = a.getAttribute('href');
  let el = document.querySelector(href);
  let top = el.offsetTop;
  window.scrollTo(0,top - 60);

  }
}


loading.classList.remove('loading');


