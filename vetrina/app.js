// BLADE//KAI — shared page behavior (detail pages)
(function(){
  // mobile hamburger
  var nav=document.querySelector('nav');
  var btn=document.querySelector('.navtoggle');
  if(btn&&nav){
    btn.addEventListener('click',function(){
      var open=nav.classList.toggle('open');
      btn.setAttribute('aria-expanded',open);
    });
  }
  // scroll reveal
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);} });
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el,i){
    el.style.transitionDelay=((i%4)*60)+'ms'; io.observe(el);
  });
  // cinematic panels reveal (threshold a bit higher so copy lands in view)
  var ioCine=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){e.target.classList.add('in');ioCine.unobserve(e.target);} });
  },{threshold:.28});
  document.querySelectorAll('.reveal-cine').forEach(function(el){ ioCine.observe(el); });
  // in-page nav active state + close menu on tap
  var links=[].slice.call(document.querySelectorAll('.navlinks a'));
  links.forEach(function(a){
    a.addEventListener('click',function(){
      if(nav){nav.classList.remove('open');btn&&btn.setAttribute('aria-expanded','false');}
    });
  });
  var anchored=links.filter(function(a){return (a.getAttribute('href')||'').charAt(0)==='#';});
  if(anchored.length){
    var secs=[].slice.call(document.querySelectorAll('section[id]'));
    var spy=new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){
        anchored.forEach(function(l){ l.classList.toggle('active',l.getAttribute('href')==='#'+e.target.id); });
      }});
    },{rootMargin:'-45% 0px -50% 0px'});
    secs.forEach(function(s){spy.observe(s);});
  }
})();
