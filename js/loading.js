// loading.js - Professional Loading Animation Controller

/**
 * Initialize the loading animation system
 */
class LoadingSystem {
  constructor() {
    this.loaderWrapper = document.querySelector('.loader-wrapper');
    this.loader = document.querySelector('.loader');
    this.loaderText = document.querySelector('.loader-text');
    this.minimumLoadingTime = 1500; // 1.5 seconds minimum loading time
    this.startTime = Date.now();
    
    this.init();
  }

  /**
   * Initialize the loading system
   */
  init() {
    if (!this.loaderWrapper) {
      console.error('Loader wrapper element not found');
      return;
    }

    // Lock scroll during loading
    document.body.style.overflow = 'hidden';
    
    // Set up error handling
    window.addEventListener('error', this.handleError.bind(this));
    
    // Start loading completion check
    this.checkLoadingCompletion();
  }

  /**
   * Check if all resources are loaded and minimum time has elapsed
   */
  checkLoadingCompletion() {
    const elapsed = Date.now() - this.startTime;
    const remainingTime = Math.max(0, this.minimumLoadingTime - elapsed);

    setTimeout(() => {
      // Check if all resources are loaded (images, fonts, etc.)
      Promise.all([
        this.imagesLoaded(),
        this.fontsLoaded(),
        document.readyState === 'complete'
      ]).then(() => {
        this.hideLoader();
      }).catch(() => {
        // If something fails, still hide loader after minimum time
        this.hideLoader();
      });
    }, remainingTime);
  }

  /**
   * Check if all images are loaded
   */
  imagesLoaded() {
    return new Promise((resolve) => {
      const images = document.images;
      let loaded = 0;
      
      if (images.length === 0) {
        resolve();
        return;
      }

      const imageLoaded = () => {
        loaded++;
        if (loaded === images.length) resolve();
      };

      for (let img of images) {
        if (img.complete) {
          loaded++;
        } else {
          img.addEventListener('load', imageLoaded);
          img.addEventListener('error', imageLoaded); // Count even if error
        }
      }

      // If all images are already loaded
      if (loaded === images.length) resolve();
    });
  }

  /**
   * Check if all fonts are loaded
   */
  fontsLoaded() {
    if (!document.fonts) return Promise.resolve();
    return document.fonts.ready;
  }

  /**
   * Hide the loader with smooth transition
   */
  hideLoader() {
    if (!this.loaderWrapper) return;

    this.loaderWrapper.style.opacity = '0';
    
    setTimeout(() => {
      this.loaderWrapper.style.display = 'none';
      document.body.style.overflow = 'auto';
      
      // Dispatch custom event when loading is complete
      document.dispatchEvent(new Event('loadingComplete'));
      
      // Trigger animations after loading
      this.triggerAnimations();
    }, 500);
  }

  /**
   * Trigger all animations after loading
   */
  triggerAnimations() {
    const animatedElements = document.querySelectorAll('[class*="animate-"]');
    animatedElements.forEach(el => {
      el.style.visibility = 'visible';
    });
  }

  /**
   * Handle any errors during loading
   */
  handleError() {
    console.warn('Error occurred during loading, hiding loader');
    this.hideLoader();
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new LoadingSystem();
});

// Fallback in case DOMContentLoaded doesn't fire
setTimeout(() => {
  if (document.readyState === 'loading') {
    new LoadingSystem();
  }
}, 3000);
