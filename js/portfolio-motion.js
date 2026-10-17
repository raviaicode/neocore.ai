// Visible by default: scroll entrances never gate access to portfolio content.
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const mounted = new WeakSet();
  const animations = new Map();
  const selectors = [
    '#about .about-profile-photo', '#about .about-profile-heading', '#about .about-profile-highlight',
    '#skills .text-center', '#tech-showcase', '#skills .magic-bento__cell',
    '#projects .project-section-heading', '#projects [x-component="Card"]',
    '#architecture .text-center', '#architecture [x-component="Card"]',
    '#devops .text-center', '#devops [x-component="Card"]',
    '#ai .text-center.mb-16', '#ai [x-component="Card"]',
    '#experience .text-center', '#experience [x-component="Card"]',
    '#contact .text-center', '#contact [x-component="Card"]'
  ].join(', ');

  const observer = new IntersectionObserver(entries => {
    const entering = entries.filter(entry => entry.isIntersecting);
    entering.forEach((entry, index) => {
      const element = entry.target;
      observer.unobserve(element);
      if (reduced.matches) { element.dataset.revealState = 'done'; return; }
      const distance = window.innerWidth < 768 ? 16 : 36;
      const from = {
        left: `translateX(-${distance}px) scale(.985)`,
        right: `translateX(${distance}px) scale(.985)`,
        zoom: 'translateY(14px) scale(.95)'
      }[element.dataset.reveal];
      element.dataset.revealState = 'running';
      const animation = element.animate([
        { opacity: 0, transform: from },
        { opacity: 1, transform: 'translate(0, 0) scale(1)' }
      ], {
        duration: 650, delay: Math.min(index, 3) * 85,
        easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards'
      });
      animations.set(element, animation);
      animation.onfinish = animation.oncancel = () => {
        element.dataset.revealState = 'done';
        animations.delete(element);
      };
    });
  }, { threshold: .12, rootMargin: '0px 0px -20px 0px' });

  const mount = () => {
    document.querySelectorAll(selectors).forEach(element => {
      if (mounted.has(element)) return;
      mounted.add(element);
      const siblings = [...element.parentElement.children];
      const cards = element.closest('section')?.querySelectorAll('[x-component="Card"]');
      const index = element.matches('[x-component="Card"]') ? [...cards].indexOf(element) : siblings.indexOf(element);
      element.dataset.reveal = element.matches('.about-profile-photo') ? 'left'
        : element.matches('.about-profile-heading') ? 'right'
        : element.matches('.text-center, .project-section-heading, #tech-showcase') ? 'zoom'
        : element.matches('.magic-bento__cell') ? ['left', 'zoom', 'right'][index % 3]
        : ['left', 'right'][index % 2];
      element.dataset.revealState = 'pending';
      observer.observe(element);
      // Animate the Bento cell, leaving its inner tilt and spotlight untouched.
      if (!element.matches('[x-component="Card"]')) return;
      element.classList.add('portfolio-motion-card');
      let raf = 0;
      let point;
      element.addEventListener('pointermove', event => {
        if (reduced.matches || !finePointer.matches) return;
        point = { x: event.clientX, y: event.clientY };
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          const rect = element.getBoundingClientRect();
          element.style.setProperty('--card-x', `${point.x - rect.left}px`);
          element.style.setProperty('--card-y', `${point.y - rect.top}px`);
        });
      }, { passive: true });
    });
  };
  reduced.addEventListener('change', () => {
    if (reduced.matches) animations.forEach(animation => animation.cancel());
  });
  let queued = false;
  const ready = new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; mount(); });
  });
  ready.observe(document.getElementById('root') || document.body, { childList: true, subtree: true });
  mount();
})();
