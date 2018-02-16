
window.addEventListener('scroll',function(){
  findClosest()
})
  
//-------------
function findClosest(){
    let specialTags = document.querySelectorAll('[data-y]');
    let minIndex = 0;
    for(let i =1;i<specialTags.length; i++){
      if(Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)){
        minIndex = i;
      }
    }
    // minIndex 就是里窗口顶部最近的元素
    specialTags[minIndex].classList.add('active');
    let id = specialTags[minIndex].id;
    let a = document.querySelector('a[href="#'+ id + '"]');
    let li = a.parentNode;
    let brothersAndMe = li.parentNode.children;
    for(let i=0; i<brothersAndMe.length; i++){
      brothersAndMe[i].classList.remove('highlight');
    }
    li.classList.add('highlight');
   }
   let liTags = document.querySelectorAll('nav > ul > li');
   for(let i=0; i<liTags.length; i++){
     liTags[i].onmouseenter = function(x){
       x.currentTarget.classList.add('active');
     }
     liTags[i].onmouseleave = function(x){
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