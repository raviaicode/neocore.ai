// Gentle entrances and surface lighting for the existing portfolio cards.
(() => {
  const media = window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse), (max-width: 767px)');
  const mounted = new WeakSet();
  const animations = new Set();
  const observer = new IntersectionObserver(entries => entries.forEach((entry,index) => {
    if (!entry.isIntersecting) return;
    observer.unobserve(entry.target);
    if (media.matches) return;
    const animation = entry.target.animate([{ opacity: .1, transform: 'translateY(20px)' }, { opacity: 1, transform: 'translateY(0)' }], {duration:550, delay:index%3*70, easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});
    animations.add(animation);
    animation.onfinish=()=>animations.delete(animation);
  }), {threshold:.08});
  const mount = () => {
    document.querySelectorAll('#about [x-component="Card"], #projects [x-component="Card"], #architecture [x-component="Card"], #devops [x-component="Card"], #ai [x-component="Card"]').forEach(card => {
      if (mounted.has(card)) return;
      mounted.add(card);
      card.classList.add('portfolio-motion-card');
      observer.observe(card);
      let raf=0;
      let point;
      card.addEventListener('pointermove', event=>{
        if(media.matches) return;
        point={x:event.clientX,y:event.clientY};
        if(raf) return;
        raf=requestAnimationFrame(()=>{
          raf=0;
          const rect=card.getBoundingClientRect();
          card.style.setProperty('--card-x',`${point.x-rect.left}px`);
          card.style.setProperty('--card-y',`${point.y-rect.top}px`);
        });
      },{passive:true});
    });
  };
  media.addEventListener('change',()=>{if(media.matches){animations.forEach(a=>a.cancel());animations.clear();}});
  const ready = new MutationObserver(mount);
  ready.observe(document.getElementById('root')||document.body,{childList:true,subtree:true});
  mount();
})();
