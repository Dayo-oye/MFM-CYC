/**
 * Animations Module
 * Handles scroll-triggered animations and counters
 */

import { $$, getData, prefersReducedMotion, formatNumber } from './utils.js';

export class AnimationController {
  constructor(options = {}) {
    this.options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
      ...options,
    };
    
    this.observer = null;
    this.animatedElements = new Set();
    
    // Skip animations if user prefers reduced motion
    if (prefersReducedMotion()) {
      this.disableAnimations();
      return;
    }
    
    this.init();
  }

  init() {
    this.setupObserver();
    this.observeElements();
  }

  setupObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.handleIntersection(entry.target);
        }
      });
    }, this.options);
  }

  observeElements() {
    const selectors = [
      '.scroll-trigger',
      '.scroll-trigger-left',
      '.scroll-trigger-right',
      '.scroll-trigger-scale',
      '.animate-card',
      '.animate-counter',
      '.animate-fade-up',
      '[data-delay]',
    ];

    const elements = $$(selectors.join(', '));
    elements.forEach((el) => this.observer.observe(el));
  }

  handleIntersection(element) {
    // Prevent multiple animations
    if (this.animatedElements.has(element)) return;
    this.animatedElements.add(element);

    // Handle delay
    const delay = parseInt(getData(element, 'delay', 0));
    
    setTimeout(() => {
      element.classList.add('visible');
      
      // Handle counters
      if (element.classList.contains('animate-counter')) {
        this.animateCounter(element);
      }
    }, delay);
  }

  animateCounter(element) {
    const target = parseInt(getData(element, 'target', 100));
    const speed = parseInt(getData(element, 'speed', 2000));
    const numberElement = element.querySelector('.stat-number') || 
                         element.querySelector('.counter-value');

    if (!numberElement) return;

    let start = 0;
    const increment = target / (speed / 16); // 60fps
    
    const updateCounter = () => {
      start += increment;
      
      if (start >= target) {
        numberElement.textContent = formatNumber(target);
      } else {
        numberElement.textContent = formatNumber(Math.floor(start));
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  }

  disableAnimations() {
    // Add visible class to all elements immediately
    const selectors = [
      '.scroll-trigger',
      '.scroll-trigger-left',
      '.scroll-trigger-right',
      '.scroll-trigger-scale',
      '.animate-card',
      '.animate-counter',
      '.animate-fade-up',
    ];

    $$(selectors.join(', ')).forEach((el) => {
      el.classList.add('visible');
    });
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.animatedElements.clear();
  }
}

/**
 * Loading Screen Handler
 */
export class LoadingScreen {
  constructor() {
    this.loadingScreen = document.querySelector('.loading-screen');
    this.minDisplayTime = 1000;
    this.fadeOutDuration = 500;
  }

  hide() {
    if (!this.loadingScreen) return;

    setTimeout(() => {
      this.loadingScreen.classList.add('loaded');
      
      setTimeout(() => {
        this.loadingScreen.remove();
      }, this.fadeOutDuration);
    }, this.minDisplayTime);
  }
}

/**
 * Back to Top Button
 */
export class BackToTop {
  constructor() {
    this.button = document.querySelector('.back-to-top');
    this.scrollThreshold = 300;
    
    if (this.button) {
      this.init();
    }
  }

  init() {
    this.setupScrollListener();
    this.button.addEventListener('click', () => this.scrollToTop());
  }

  setupScrollListener() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.toggleVisibility();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  toggleVisibility() {
    if (window.scrollY > this.scrollThreshold) {
      this.button.classList.add('visible');
    } else {
      this.button.classList.remove('visible');
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}

// Initialize all animations
export const initAnimations = () => {
  const loadingScreen = new LoadingScreen();
  loadingScreen.hide();
  
  const animations = new AnimationController();
  const backToTop = new BackToTop();
  
  return {
    animations,
    backToTop,
    loadingScreen,
  };
};
