class PortfolioApp {
  constructor() {
    this.dom = new DOMHelper();
    this.controllers = [
      new ScrollAnimationController({ dom: this.dom }),
      new ActiveNavigationController({ dom: this.dom }),
      new InteractiveConsole({ dom: this.dom }),
      new ProjectFilter({ dom: this.dom }),
      new PipelineModal({ dom: this.dom })
    ];
  }

  init() {
    this.controllers.forEach(controller => controller.init());
  }
}

