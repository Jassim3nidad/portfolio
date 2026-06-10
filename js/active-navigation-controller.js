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
    this.sectionOffsets = [];
  }

  init() {
    this.sections = this.dom.getAll(this.sectionSelector);
    this.navLinks = this.dom.getAll(this.linkSelector);
    
    // Cache section offsets on init, load, and resize
    this.cacheOffsets();
    window.addEventListener('resize', () => this.cacheOffsets(), { passive: true });
    window.addEventListener('load', () => this.cacheOffsets(), { passive: true });

    this.updateActiveLink();
    window.addEventListener('scroll', () => this.updateActiveLink(), { passive: true });
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

    for (let i = 0; i < this.sectionOffsets.length; i++) {
      const section = this.sectionOffsets[i];
      if (scrollY >= section.offsetTop - this.scrollOffset) {
        currentSectionId = section.id;
      }
    }

    return currentSectionId;
  }
}

