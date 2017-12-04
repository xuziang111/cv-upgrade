
works1.onclick=function(){
  worksBar.className='state1';
};
works2.onclick=function(){
  worksBar.className='state2';
};
works3.onclick=function(){
  worksBar.className='state3';
};
var obj = {x:1,minIndex:0,Y:0} ;
obj.Y=window.scrollY;
window.onscroll=function(){
  if(window.scrollY>0){      
    topNavBarIn.classList.add('stick');       
  }else{
    topNavBarIn.classList.remove('stick');
  }

  let specialTags = document.querySelectorAll('[data-y]');
  if(obj.Y<window.scrollY&&specialTags[obj.minIndex+1].offsetTop - window.scrollY-window.innerHeight <= 0){
      obj.minIndex=obj.x;
      specialTags[obj.x].classList.add('active');
      if(obj.x<2){
      obj.x=obj.x+1;
    }
    }else  if (obj.Y>window.scrollY&&specialTags[obj.minIndex].offsetTop - window.scrollY-window.innerHeight > 0&&obj.x>0){      
      specialTags[obj.x].classList.remove('active');
      obj.x=obj.x-1;
      specialTags[obj.x].classList.add('active');
      obj.minIndex=obj.x;
      
    }
  

  let li = document.querySelector('a[href="#' + specialTags[obj.minIndex].id + '"]').parentNode;
  let brothers = li.parentNode.children;
  for(let k=0;k<brothers.length;k++){
    brothers[k].classList.remove('highlight');
  }
  li.classList.add('highlight');
  obj.Y=window.scrollY;
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
  let top = document.querySelector(x.currentTarget.getAttribute('href')).offsetTop;//获取元素到页面顶部的距离
  let currentTop = window.scrollY;
  let t = Math.abs((top- 60 - currentTop)/100)
  if(t>5){
    t=5
  }else if(t<1){
    t=1
  };
  function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
  }
  requestAnimationFrame(animate);
  var coords = { y: currentTop }; 
  var tween = new TWEEN.Tween(coords) 
    .to({y: (top- 60) }, t*200) 
    .easing(TWEEN.Easing.Quadratic.InOut) 
    .onUpdate(function() {             
      window.scrollTo(0,coords.y)
    })
    .start(); 



/**  let j=0,n = 25;//动多少次
  let duration = 500/n;//动一次多长时间
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
  **/

  }
} 

window.scrollTo(0,1);
loading.classList.remove('loading');


