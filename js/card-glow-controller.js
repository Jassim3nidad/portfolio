class CardGlowController {
  constructor({ dom, selector = '.project-card, .zapier-card' }) {
    this.dom = dom;
    this.selector = selector;
    this.cards = null;
  }

  init() {
    this.cards = this.dom.getAll(this.selector);
    if (!this.cards || this.cards.length === 0) return;

    // Attach event listeners to the container of the cards, or to the window
    // to track mouse position accurately relative to each card.
    document.getElementById('projects')?.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    document.getElementById('zapier')?.addEventListener('mousemove', (e) => this.handleMouseMove(e));
  }

  handleMouseMove(e) {
    for (const card of this.cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  }
}
