// assist_ui.js - small UI helpers
document.addEventListener('DOMContentLoaded', function(){
  // mobile nav toggle
  const toggle = document.querySelectorAll('.nav-toggle');
  const links = document.querySelectorAll('.nav-links');
  toggle.forEach(t=>{
    t.addEventListener('click', ()=>{
      links.forEach(l=>{
        if(l.style.display === 'flex') l.style.display = '';
        else l.style.display = 'flex';
      });
    });
  });

  // fade-in for elements with data-fade attribute
  const fades = document.querySelectorAll('[data-fade]');
  fades.forEach((el,i)=>{
    el.style.opacity = 0;
    el.style.transform = 'translateY(8px)';
    setTimeout(()=> {
      el.style.transition = 'opacity .6s ease, transform .6s ease';
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }, 120 * i);
  });
});
