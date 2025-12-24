// Small helpers
const qs  = (s, r=document) => r.querySelector(s);
const qsa = (s, r=document) => Array.from(r.querySelectorAll(s));

/* -------------------------------------------------------------------------- */
/*  Shared layout: inject consistent header and footer                        */
/* -------------------------------------------------------------------------- */
(function layout(){
  const headerTemplate = `
  <header class="site-header" role="banner">
    <div class="container header-inner">
      <a class="brand" href="index.html#top" aria-label="Allo Recharge home">
        <img src="assets/logo-ar.svg" alt="Allo Recharge logo" class="logo-mark-img"/>
        <span class="logo-text">ALLO <strong>RECHARGE</strong></span>
      </a>
      <nav class="nav" aria-label="Primary">
        <ul class="nav-links">
          <li><a href="index.html#deals">Deals</a></li>
          <li><a href="index.html#categories">Categories</a></li>
          <li><a href="index.html#featured">Featured</a></li>
          <li><a href="index.html#contact">Contact</a></li>
        </ul>
        <div class="nav-actions" style="display:flex; gap:10px; align-items:center;">
          <button class="theme-toggle" type="button" data-theme-toggle aria-label="Toggle color theme">Switch</button>
          <a class="btn btn-ghost" href="https://wa.me/96171549671?text=Hi!%20I%20need%20a%20recharge%20quote." target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </nav>
    </div>
  </header>`;

  const footerTemplate = `
  <footer class="site-footer" id="contact" role="contentinfo">
    <div class="container footer-grid">
      <div>
        <span class="logo-text">ALLO <strong>RECHARGE</strong></span>
        <h4>Instant digital recharges, subscriptions, and growth services.</h4>
      </div>
      <div>
        <h4>Contact</h4>
        <div class="footer-social">
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" class="icon-link icon-fb"></a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" class="icon-link icon-ig"></a>
          <a href="mailto:allorecharge@gmail.com" aria-label="Email" class="icon-link icon-mail"></a>
          <a href="https://wa.me/96171549671" target="_blank" rel="noreferrer" aria-label="WhatsApp" class="icon-link icon-wa"></a>
        </div>
      </div>
      <div>
        <h4>Quick Links</h4>
        <ul class="list-plain">
          <li><a href="index.html#featured">Featured</a></li>
          <li><a href="index.html#categories">Categories</a></li>
          <li><a href="services.html">All Services</a></li>
        </ul>
      </div>
    </div>
    <div class="copy">Ac 2025 Allo Recharge. All rights reserved.</div>
  </footer>`;

  const body = document.body;
  if (!body) return;

  if (!qs('#top')){ body.insertAdjacentHTML('afterbegin', '<div id="top" aria-hidden="true"></div>'); }

  const header = qs('.site-header');
  if (header){ header.outerHTML = headerTemplate; }
  else { body.insertAdjacentHTML('afterbegin', headerTemplate); }

  const footer = qs('.site-footer');
  if (footer){ footer.outerHTML = footerTemplate; }
  else { body.insertAdjacentHTML('beforeend', footerTemplate); }
})();

/* -------------------------------------------------------------------------- */
/*  Theme toggle respects system until user chooses                           */
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
