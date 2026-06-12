class MobileMenuController {
  constructor({ dom }) {
    this.dom = dom;
    this.menuToggle = null;
    this.navLinks = null;
    this.links = null;
  }

  init() {
    this.menuToggle = this.dom.get('.menu-toggle');
    this.navLinks = this.dom.get('.nav-links');
    this.links = this.dom.getAll('.nav-links a');

    if (!this.menuToggle || !this.navLinks) return;

    this.menuToggle.addEventListener('click', () => {
      this.navLinks.classList.toggle('active');
      this.menuToggle.classList.toggle('active');
    });

    // Close menu when a link is clicked
    if (this.links) {
      this.links.forEach(link => {
        link.addEventListener('click', () => {
          this.navLinks.classList.remove('active');
          this.menuToggle.classList.remove('active');
        });
      });
    }
  }
}
