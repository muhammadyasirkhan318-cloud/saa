/**
 * QURAN ACADEMY - VANILLA JAVASCRIPT
 * Pure ES6 JavaScript for interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initHeader();
  initMobileMenu();
  initTestimonialsCarousel();
  initScrollAnimations();
  initSmoothScroll();
});

/**
 * HEADER - Sticky scroll effect
 */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateHeader = () => {
    if (window.scrollY > 20) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });

  // Initial check
  updateHeader();
}

/**
 * MOBILE MENU - Toggle functionality
 */
function initMobileMenu() {
  const toggle = document.querySelector('.header__mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuLinks = document.querySelectorAll('.mobile-menu__link');
  
  if (!toggle || !mobileMenu) return;

  toggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('mobile-menu--open');
    
    if (isOpen) {
      mobileMenu.classList.remove('mobile-menu--open');
      toggle.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="4" x2="20" y1="12" y2="12"></line>
          <line x1="4" x2="20" y1="6" y2="6"></line>
          <line x1="4" x2="20" y1="18" y2="18"></line>
        </svg>
      `;
    } else {
      mobileMenu.classList.add('mobile-menu--open');
      toggle.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6 6 18"></path>
          <path d="m6 6 12 12"></path>
        </svg>
      `;
    }
  });

  // Close menu when clicking a link
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('mobile-menu--open');
      toggle.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="4" x2="20" y1="12" y2="12"></line>
          <line x1="4" x2="20" y1="6" y2="6"></line>
          <line x1="4" x2="20" y1="18" y2="18"></line>
        </svg>
      `;
    });
  });
}

/**
 * TESTIMONIALS CAROUSEL
 */
function initTestimonialsCarousel() {
  const testimonials = [
    {
      name: "Sarah Ahmed",
      role: "Parent from UK",
      content: "My children have been learning with Quran Academy for over a year now. The teachers are incredibly patient and the progress has been amazing. Alhamdulillah, both my kids can now read Quran fluently with Tajweed.",
      rating: 5,
      childAge: "Ages 8 & 11"
    },
    {
      name: "Mohammed Rahman",
      role: "Student from USA",
      content: "I started as an adult with zero knowledge of Arabic. Within 6 months, I was able to recite Surah Al-Fatiha properly. The flexible scheduling made it possible to learn while working full-time.",
      rating: 5,
      childAge: "Adult Learner"
    },
    {
      name: "Aisha Khalil",
      role: "Parent from Canada",
      content: "What I love most is the monthly progress reports. I can see exactly how my daughter is improving. The female teacher is wonderful - my daughter looks forward to every class!",
      rating: 5,
      childAge: "Age 7"
    },
    {
      name: "Omar Ibrahim",
      role: "Parent from Australia",
      content: "We tried several online Quran academies before finding this one. The difference is the quality of teachers and the structured curriculum. Highly recommend for serious learners.",
      rating: 5,
      childAge: "Ages 5 & 9"
    }
  ];

  let currentIndex = 0;
  const cardContainer = document.querySelector('.testimonial-card');
  const dots = document.querySelectorAll('.testimonials__dot');
  const prevBtn = document.querySelector('.testimonials__nav-btn--prev');
  const nextBtn = document.querySelector('.testimonials__nav-btn--next');

  if (!cardContainer) return;

  function renderTestimonial(index) {
    const testimonial = testimonials[index];
    const starsHTML = Array(testimonial.rating).fill(`
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    `).join('');

    cardContainer.innerHTML = `
      <svg class="testimonial-card__quote" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21c0 1 0 1 1 1z"></path>
        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
      </svg>
      <p class="testimonial-card__content">"${testimonial.content}"</p>
      <div class="testimonial-card__footer">
        <div>
          <p class="testimonial-card__author">${testimonial.name}</p>
          <p class="testimonial-card__meta">${testimonial.role} • ${testimonial.childAge}</p>
        </div>
        <div class="testimonial-card__rating">
          ${starsHTML}
        </div>
      </div>
    `;

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('testimonials__dot--active', i === index);
    });
  }

  function goToNext() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    renderTestimonial(currentIndex);
  }

  function goToPrev() {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    renderTestimonial(currentIndex);
  }

  // Event listeners
  if (nextBtn) nextBtn.addEventListener('click', goToNext);
  if (prevBtn) prevBtn.addEventListener('click', goToPrev);

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      renderTestimonial(currentIndex);
    });
  });

  // Initial render
  renderTestimonial(0);
}

/**
 * SCROLL ANIMATIONS - Intersection Observer
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
}

/**
 * SMOOTH SCROLL - For anchor links
 */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * FORM HANDLING (Optional - for demo purposes)
 */
const ctaForm = document.querySelector('.cta-form form');
if (ctaForm) {
  ctaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your interest! We will contact you shortly to schedule your free trial.');
    ctaForm.reset();
  });
}
