'use strict';

{
  const open = document.getElementById('open');
  const overlay = document.querySelector('.overlay');
  const close = document.getElementById('close');
  const hero_title = document.getElementById('hero_title');
  
  open.addEventListener('click', () => {
    overlay.classList.add('show');
    open.classList.add('hide');
    hero_title.classList.add('hide');
  });

  close.addEventListener('click', () => {
    overlay.classList.remove('show');
    open.classList.remove('hide');
    hero_title.classList.remove('hide');
  });

  var overlay_link = document.getElementsByClassName('overlay_link');
  var overlay_links = Array.from(overlay_link);

  overlay_links.forEach(function(target) {
    target.addEventListener('click', () => {
    overlay.classList.remove('show');
    open.classList.remove('hide');
    hero_title.classList.remove('hide');
    });
  });

}