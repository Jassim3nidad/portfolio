class ProjectFilter {
  constructor({ dom, buttonSelector = '.filter-btn', cardSelector = '.project-card' }) {
    this.dom = dom;
    this.buttons = [];
    this.cards = [];
    this.buttonSelector = buttonSelector;
    this.cardSelector = cardSelector;
  }

  init() {
    this.buttons = this.dom.getAll(this.buttonSelector);
    this.cards = this.dom.getAll(this.cardSelector);

    if (this.buttons.length === 0) return;

    this.buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const category = button.getAttribute('data-filter');
        this.filterProjects(category);
        this.updateActiveButton(button);
      });
    });
  }

  filterProjects(category) {
    this.cards.forEach(card => {
      const cardCategories = card.getAttribute('data-category') || '';
      const categoriesArray = cardCategories.split(' ');

      // Check if match
      const isMatch = category === 'all' || categoriesArray.includes(category);

      if (isMatch) {
        card.style.display = '';
        // Small delay to trigger CSS transitions if needed
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
          card.style.pointerEvents = 'auto';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        card.style.pointerEvents = 'none';
        // Hide from layout after transition completes
        setTimeout(() => {
          if (card.style.opacity === '0') {
            card.style.display = 'none';
          }
        }, 300);
      }
    });
  }

  updateActiveButton(activeBtn) {
    this.buttons.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
  }
}
