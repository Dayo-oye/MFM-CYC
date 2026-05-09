/**
 * Navigation Module
 * Handles mobile and desktop navigation functionality
 */

import { $, $$, throttle } from './utils.js';

export class Navigation {
  constructor() {
    this.header = $('.main-header');
    this.mobileToggle = $('.mobile-menu-toggle');
    this.mobileNav = $('.mobile-nav');
    this.mobileClose = $('.mobile-close');
    this.mobileLinks = $$('.mobile-nav-link');
    this.isOpen = false;
    this.scrollThreshold = 50;
    
    if (this.header) {
      this.init();
    }
  }

  init() {
    this.setupMobileMenu();
    this.setupScrollEffect();
    this.setupSmoothScroll();
    this.setupActiveLinks();
  }

  setupMobileMenu() {
    if (!this.mobileToggle || !this.mobileNav) return;

    // Toggle mobile menu
    this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());

    // Close button
    if (this.mobileClose) {
      this.mobileClose.addEventListener('click', () => this.closeMobileMenu());
    }

    // Close when clicking links
    this.mobileLinks.forEach((link) => {
      link.addEventListener('click', () => this.closeMobileMenu());
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (
        this.isOpen &&
        !this.mobileNav.contains(e.target) &&
        !this.mobileToggle.contains(e.target)
      ) {
        this.closeMobileMenu();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMobileMenu();
      }
    });
  }

  toggleMobileMenu() {
    if (this.isOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    this.isOpen = true;
    this.mobileToggle.setAttribute('aria-expanded', 'true');
    this.mobileNav.classList.add('active');
    this.mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus first link for accessibility
    const firstLink = this.mobileNav.querySelector('.mobile-nav-link');
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 100);
    }
  }

  closeMobileMenu() {
    this.isOpen = false;
    this.mobileToggle.setAttribute('aria-expanded', 'false');
    this.mobileNav.classList.remove('active');
    this.mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  setupScrollEffect() {
    const handleScroll = throttle(() => {
      if (window.scrollY > this.scrollThreshold) {
        this.header.classList.add('scrolled');
      } else {
        this.header.classList.remove('scrolled');
      }
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  setupSmoothScroll() {
    const anchors = $$('a[href^="#"]');
    
    anchors.forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        
        // Skip if it's just "#" or hash links
        if (href === '#' || href.startsWith('#!')) return;

        const target = $(href);
        if (!target) return;

        e.preventDefault();

        // Calculate header offset
        const headerHeight = this.header ? this.header.offsetHeight : 0;
        const targetPosition = target.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });

        // Update URL
        if (history.pushState) {
          history.pushState(null, null, href);
        }

        // Close mobile menu if open
        if (this.isOpen) {
          this.closeMobileMenu();
        }
      });
    });
  }

  setupActiveLinks() {
    // Get current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Update active states
    const navLinks = $$('.nav-link, .mobile-nav-link');
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  destroy() {
    // Clean up event listeners if needed
    if (this.isOpen) {
      this.closeMobileMenu();
    }
  }
}

// Initialize navigation
export const initNavigation = () => {
  return new Navigation();
};
