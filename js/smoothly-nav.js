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
