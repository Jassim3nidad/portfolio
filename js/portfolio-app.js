class PortfolioApp {
  constructor() {
    this.dom = new DOMHelper();
    this.controllers = [
      new ScrollAnimationController({ dom: this.dom }),
      new ActiveNavigationController({ dom: this.dom }),
      new SplinePerformanceController({ dom: this.dom }),
      new InteractiveConsole({ dom: this.dom }),
      new ProjectFilter({ dom: this.dom }),
      new PipelineModal({ dom: this.dom, triggerId: 'view-pipeline-btn', modalId: 'pipeline-modal' }),
      new PipelineModal({ dom: this.dom, triggerId: 'view-lead-btn', modalId: 'lead-modal' }),
      new PipelineModal({ dom: this.dom, triggerId: 'view-task-btn', modalId: 'task-modal' }),
      new PipelineModal({ dom: this.dom, triggerId: 'view-repurpose-btn', modalId: 'repurpose-modal' }),
      new PipelineModal({ dom: this.dom, triggerId: 'view-autocrm-btn', modalId: 'autocrm-modal' }),
      new PipelineModal({ dom: this.dom, triggerId: 'view-enrichment-btn', modalId: 'enrichment-modal' }),
      new PipelineModal({ dom: this.dom, triggerId: 'view-zapier-nsk-btn', modalId: 'pipeline-modal' })
    ];
  }

  init() {
    this.controllers.forEach(controller => controller.init());
  }
}

