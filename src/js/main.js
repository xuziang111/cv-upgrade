import '../index.html'
import "../css/loading.scss"
import a from './auto-offset'
import b from './inint-swiper'
import c from './message'
import d from './smoothly-nav'
import e from './topbar-sticky'
import "../css/style.scss"

!function(){
window.scrollTo(0,1);
loading.classList.remove('loading');
a()
b()
c()
d()
e()
}.call()