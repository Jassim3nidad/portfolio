class ActiveNavigationController {
  constructor({
    dom,
    sectionSelector = 'section[id]',
    linkSelector = '.nav-links a',
    activeColor = 'var(--text)',
    inactiveColor = 'var(--text2)',
    scrollOffset = 200
  }) {
    this.dom = dom;
    this.sectionSelector = sectionSelector;
    this.linkSelector = linkSelector;
    this.activeColor = activeColor;
    this.inactiveColor = inactiveColor;
    this.scrollOffset = scrollOffset;
    this.sections = [];
    this.navLinks = [];
  }

  init() {
    this.sections = this.dom.getAll(this.sectionSelector);
    this.navLinks = this.dom.getAll(this.linkSelector);
    this.sectionOffsets = [];
    this.cacheOffsets();
    this.updateActiveLink();

    window.addEventListener('scroll', () => this.updateActiveLink(), { passive: true });
    window.addEventListener('resize', () => {
      this.cacheOffsets();
      this.updateActiveLink();
    }, { passive: true });
  }

  cacheOffsets() {
    this.sectionOffsets = this.sections.map(section => ({
      id: section.id,
      offsetTop: section.offsetTop
    }));
  }

  updateActiveLink() {
    const currentSectionId = this.getCurrentSectionId();

    this.navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${currentSectionId}`;
      link.style.color = isActive ? this.activeColor : this.inactiveColor;
    });
  }

  getCurrentSectionId() {
    let currentSectionId = '';
    const scrollY = window.scrollY;

    this.sectionOffsets.forEach(section => {
      if (scrollY >= section.offsetTop - this.scrollOffset) {
        currentSectionId = section.id;
      }
    });

    return currentSectionId;
  }
}
