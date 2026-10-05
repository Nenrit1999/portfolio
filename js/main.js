/* Nenrit Angel Lambert — site interactions */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Hero load sequence ---------- */
  requestAnimationFrame(() => {
    requestAnimationFrame(() => document.body.classList.add('is-loaded'));
  });

  /* ---------- Current year ---------- */
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Nav: solid background after scrolling ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => nav && nav.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector('.nav__toggle');
  const links = document.getElementById('nav-links');
  const closeMenu = () => {
    document.body.classList.remove('nav-open');
    toggle && toggle.setAttribute('aria-expanded', 'false');
    toggle && toggle.setAttribute('aria-label', 'Open menu');
  };
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    links.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  }

  /* ---------- Active section in nav ---------- */
  const navLinks = Array.from(document.querySelectorAll('.nav__links a[href^="#"]'));
  if (navLinks.length && 'IntersectionObserver' in window) {
    const map = new Map();
    navLinks.forEach((a) => {
      const sec = document.querySelector(a.getAttribute('href'));
      if (sec) map.set(sec, a);
    });
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((a) => a.classList.remove('is-active'));
          map.get(entry.target).classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    map.forEach((_, sec) => spy.observe(sec));
  }

  /* ---------- Quiet reveal ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Timeline line draws with scroll ---------- */
  const timeline = document.getElementById('timeline');
  if (timeline && !reduceMotion) {
    const update = () => {
      const r = timeline.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.7 - r.top) / r.height));
      timeline.style.setProperty('--progress', p.toFixed(3));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  /* ---------- Expandable project cards ---------- */
  document.querySelectorAll('.project__toggle').forEach((btn) => {
    const label = btn.querySelector('.label');
    const closedText = label ? label.textContent : '';
    btn.addEventListener('click', () => {
      const card = btn.closest('.project');
      const open = card.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
      if (label) label.textContent = open ? 'Show less' : closedText;
    });
  });

  /* ---------- Contact form ---------- */
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('form-status');
  const submitBtn = form.querySelector('button[type="submit"]');
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const showStatus = (html, isError) => {
    status.innerHTML = html;
    status.classList.add('is-visible');
    status.classList.toggle('is-error', !!isError);
  };

  const validate = () => {
    let firstInvalid = null;
    form.querySelectorAll('[required]').forEach((input) => {
      const field = input.closest('.field');
      const value = input.value.trim();
      const bad = !value || (input.type === 'email' && !emailRe.test(value));
      field.classList.toggle('has-error', bad);
      input.setAttribute('aria-invalid', String(bad));
      if (bad && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  };

  form.querySelectorAll('[required]').forEach((input) => {
    input.addEventListener('input', () => {
      const field = input.closest('.field');
      if (field.classList.contains('has-error')) {
        const v = input.value.trim();
        const ok = v && (input.type !== 'email' || emailRe.test(v));
        if (ok) { field.classList.remove('has-error'); input.setAttribute('aria-invalid', 'false'); }
      }
    });
  });

  const mailtoFallback = () => {
    const to = form.dataset.fallbackEmail;
    const d = new FormData(form);
    const subject = encodeURIComponent(`Portfolio enquiry: ${d.get('reason') || 'Hello'}`);
    const body = encodeURIComponent(
      `${d.get('message')}\n\n${d.get('name')}\n${d.get('organisation') || ''}\n${d.get('email')}`
    );
    return `mailto:${to}?subject=${subject}&body=${body}`;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.classList.remove('is-visible');
    if (!validate()) return;

    // Form service not configured yet: offer the visitor's email app instead.
    if (form.action.includes('YOUR_FORM_ID')) {
      showStatus(`The message form isn’t connected yet. <a class="text-link" href="${mailtoFallback()}">Send your message by email instead</a>.`, true);
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (!res.ok) throw new Error('Request failed');
      form.reset();
      showStatus('Message sent. Thank you for reaching out. I’ll reply by email soon.');
    } catch (err) {
      showStatus(`Your message didn’t send. Check your connection and try again, or <a class="text-link" href="${mailtoFallback()}">send it by email</a>.`, true);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message';
    }
  });
})();
