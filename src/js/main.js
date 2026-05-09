/**
 * Main Application Entry Point
 * MFM CAASO Youth Church Website
 */

import { initNavigation } from './modules/navigation.js';
import { initAnimations } from './modules/animations.js';
import { $ } from './modules/utils.js';

// Application State
const App = {
  navigation: null,
  animations: null,
  
  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.start());
    } else {
      this.start();
    }
  },
  
  start() {
    try {
      // Remove no-js class
      document.documentElement.classList.remove('no-js');
      document.documentElement.classList.add('js');
      
      // Initialize core modules
      this.navigation = initNavigation();
      this.animations = initAnimations();
      
      // Initialize page-specific features
      this.initPageFeatures();
      
      // Set current year in footer
      this.setCurrentYear();
      
      // Setup error handling
      this.setupErrorHandling();
      
      console.log('✅ MFM CAASO Youth Church Website Loaded');
    } catch (error) {
      console.error('❌ Application initialization error:', error);
      this.handleCriticalError(error);
    }
  },
  
  initPageFeatures() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Home page features
    if (currentPage === 'index.html' || currentPage === '') {
      this.initServiceCards();
      this.initGalleryPreview();
    }
    
    // Gallery page
    if (currentPage === 'gallery.html') {
      this.initFullGallery();
    }
    
    // Testimonies page
    if (currentPage === 'testimonies.html') {
      this.initTestimoniesPage();
    }
  },
  
  initServiceCards() {
    const servicesGrid = $('.services-grid');
    if (!servicesGrid) return;

    const services = [
      {
        icon: 'fa-church',
        title: 'Sunday Service',
        time: 'Sunday | 7:25AM (WAT)',
        description: 'Experience the power of God through worship, word, and prayer.',
        link: 'services.html',
        color: 'primary',
      },
      {
        icon: 'fa-bible',
        title: 'Bible Study',
        time: 'Tuesday | 8:00PM (WAT)',
        description: 'Deep dive into God\'s Word for spiritual growth and understanding.',
        link: 'https://chat.whatsapp.com/LIDaxZjSIspEdEcX0RgZwJ',
        color: 'secondary',
      },
      {
        icon: 'fa-pray',
        title: 'Prayer Meeting',
        time: 'Daily | 9:00PM (WAT)',
        description: 'Powerful prayer sessions to strengthen your spiritual life.',
        link: 'services.html',
        color: 'accent',
      },
    ];

    servicesGrid.innerHTML = services
      .map(
        (service, index) => `
        <div class="service-card scroll-trigger" data-delay="${index * 100}">
          <div class="service-card-icon service-${service.color}">
            <i class="fas ${service.icon}"></i>
          </div>
          <h3>${service.title}</h3>
          <p class="service-time">${service.time}</p>
          <p class="service-description">${service.description}</p>
          <a href="${service.link}" class="service-link" ${service.link.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>
            Learn More
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      `
      )
      .join('');
      
    // Re-observe new elements
    if (this.animations?.animations?.observer) {
      const cards = servicesGrid.querySelectorAll('.scroll-trigger');
      cards.forEach((card) => this.animations.animations.observer.observe(card));
    }
  },
  
  initGalleryPreview() {
    const galleryGrid = $('.gallery-grid');
    if (!galleryGrid) return;

    // Sample gallery items (in production, fetch from API/CMS)
    const galleryItems = [
      { title: 'Sunday Service', date: 'January 2024', image: 'assets/Images/logo.jpeg' },
      { title: 'Youth Program', date: 'December 2023', image: 'assets/Images/logo.jpeg' },
      { title: 'Outreach Event', date: 'November 2023', image: 'assets/Images/logo.jpeg' },
    ];

    galleryGrid.innerHTML = galleryItems
      .map(
        (item) => `
        <div class="gallery-item scroll-trigger">
          <div class="gallery-image">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
          </div>
          <div class="gallery-overlay">
            <h4>${item.title}</h4>
            <span>${item.date}</span>
          </div>
        </div>
      `
      )
      .join('');
  },
  
  initFullGallery() {
    // Gallery page specific functionality
    console.log('Gallery page initialized');
  },
  
  initTestimoniesPage() {
    // Testimonies page specific functionality
    console.log('Testimonies page initialized');
  },
  
  setCurrentYear() {
    const yearElement = $('#current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  },
  
  setupErrorHandling() {
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
      // In production, send to error tracking service
    });
    
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      // In production, send to error tracking service
    });
  },
  
  handleCriticalError(error) {
    // Display user-friendly error message
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ef4444;
      color: white;
      padding: 1rem;
      border-radius: 0.5rem;
      z-index: 9999;
      max-width: 400px;
    `;
    errorDiv.innerHTML = `
      <strong>Oops! Something went wrong.</strong>
      <p style="margin-top: 0.5rem; font-size: 0.875rem;">
        Please refresh the page. If the problem persists, contact us.
      </p>
    `;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => errorDiv.remove(), 5000);
  },
};

// Initialize application
App.init();

// Export for potential use in other scripts
export default App;
