class ScrollAnimationController {
  constructor({
    dom,
    selector = '.fade-up',
    visibleClass = 'visible',
    threshold = 0.1,
    staggerDelay = 80
  }) {
    this.dom = dom;
    this.selector = selector;
    this.visibleClass = visibleClass;
    this.threshold = threshold;
    this.staggerDelay = staggerDelay;
    this.elements = [];
    this.observer = null;
  }

  init() {
    this.elements = this.dom.getAll(this.selector);

    if (!('IntersectionObserver' in window)) {
      this.showAllElements();
      return;
    }

    this.observer = new IntersectionObserver(
      entries => this.handleIntersection(entries),
      { threshold: this.threshold }
    );

    this.elements.forEach(element => this.observer.observe(element));
  }

  handleIntersection(entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        this.revealElement(entry.target, index);
      } else {
        this.hideElement(entry.target);
      }
    });
  }

  revealElement(element, index) {
    setTimeout(() => {
      element.classList.add(this.visibleClass);
    }, index * this.staggerDelay);
  }

  hideElement(element) {
    element.classList.remove(this.visibleClass);
  }

  showAllElements() {
    this.elements.forEach(element => element.classList.add(this.visibleClass));
  }
}
