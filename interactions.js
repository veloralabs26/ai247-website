// Minimal interaction JS for LeftClick site

// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu when a link is tapped
  mobileMenu.querySelectorAll('.mobile-menu-link').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// PDF guide downloads
document.querySelectorAll('.download-btn[data-pdf]').forEach(btn => {
  btn.addEventListener('click', () => {
    const pdf = btn.getAttribute('data-pdf');
    const title = btn.getAttribute('data-title') || 'guide';
    const a = document.createElement('a');
    a.href = pdf;
    a.download = title.replace(/[^a-z0-9]/gi, '-').toLowerCase() + '.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
