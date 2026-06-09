class PipelineModal {
  constructor({ dom, triggerId = 'view-pipeline-btn', modalId = 'pipeline-modal' }) {
    this.dom = dom;
    this.triggerId = triggerId;
    this.modalId = modalId;
    this.triggerBtn = null;
    this.modal = null;
    this.closeBtn = null;
  }

  init() {
    this.triggerBtn = this.dom.get(`#${this.triggerId}`);
    this.modal = this.dom.get(`#${this.modalId}`);
    
    if (!this.triggerBtn || !this.modal) return;

    this.closeBtn = this.modal.querySelector('.modal-close-btn');

    this.triggerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.open();
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    // Close on clicking backdrop
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    // Close on ESC
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.close();
      }
    });
  }

  open() {
    this.modal.classList.add('active');
    this.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.classList.remove('active');
    this.modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}
