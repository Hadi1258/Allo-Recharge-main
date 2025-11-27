// Small helpers
const qs  = (s, r=document) => r.querySelector(s);
const qsa = (s, r=document) => Array.from(r.querySelectorAll(s));

/* -------------------------------------------------------------------------- */
/*  Theme toggle — respects system until user chooses                         */
/* -------------------------------------------------------------------------- */
(function theme(){
  const root = document.documentElement;
  const btn  = qs('[data-theme-toggle]');

  const setTheme = (mode) => {
    root.setAttribute('data-theme', mode);
    localStorage.setItem('theme', mode);
    if (btn){
      btn.setAttribute('data-mode', mode);
      btn.textContent = '';
      btn.setAttribute('aria-label', mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    }
  };

  const stored = localStorage.getItem('theme');
  if (stored){ setTheme(stored); }
  else {
    const prefersLight = matchMedia('(prefers-color-scheme: light)').matches;
    setTheme(prefersLight ? 'light' : 'dark');
  }

  btn?.addEventListener('click', ()=>{
    const cur = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    setTheme(cur === 'light' ? 'dark' : 'light');
  });
})();

/* -------------------------------------------------------------------------- */
/*  Sticky header state                                                       */
/* -------------------------------------------------------------------------- */
(function headerState(){
  const header = qs('.site-header'); if (!header) return;
  const onScroll = ()=>{
    const y = window.pageYOffset || document.documentElement.scrollTop || 0;
    header.classList.toggle('is-scrolled', y > 8);
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', onScroll, {passive:true});
  onScroll();
})();

/* -------------------------------------------------------------------------- */
/*  Reveal on view                                                            */
/* -------------------------------------------------------------------------- */
(function inView(){
  const els = qsa('.reveal, .card, .section-head');
  els.forEach(el => el.classList.add('reveal'));
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if (en.isIntersecting){
        en.target.classList.add('is-visible');
        obs.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el=>obs.observe(el));
})();
