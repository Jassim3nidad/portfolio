class SplinePerformanceController {
  constructor({
    dom,
    stageSelector = '.robot-stage'
  }) {
    this.dom = dom;
    this.stageSelector = stageSelector;
    this.stage = null;
    this.observer = null;
    this.scriptLoaded = false;
  }

  init() {
    this.stage = this.dom.get(this.stageSelector);
    if (!this.stage) return;

    this.checkAndLoadSpline();
    window.addEventListener('resize', () => this.checkAndLoadSpline());

    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries),
        { threshold: 0 }
      );
      this.observer.observe(this.stage);
    }
  }

  checkAndLoadSpline() {
    if (this.scriptLoaded) return;
    
    // Only load Spline on screens wider than 768px to prevent mobile lag
    if (window.innerWidth > 768) {
      this.scriptLoaded = true;
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.12.97/build/spline-viewer.js';
      document.body.appendChild(script);
    }
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Scrolled into viewport: show and resume paint/WebGL rendering
        this.stage.style.visibility = 'visible';
      } else {
        // Scrolled out of viewport: hide and suspend paint/WebGL rendering
        this.stage.style.visibility = 'hidden';
      }
    });
  }
}
