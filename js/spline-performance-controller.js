class SplinePerformanceController {
  constructor({
    dom,
    stageSelector = '.robot-stage'
  }) {
    this.dom = dom;
    this.stageSelector = stageSelector;
    this.stage = null;
    this.observer = null;
  }

  init() {
    this.stage = this.dom.get(this.stageSelector);
    if (!this.stage) return;

    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries),
        { threshold: 0 }
      );
      this.observer.observe(this.stage);
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
