class ThemeController {
  constructor({ dom, toggleSelector = '#theme-toggle' }) {
    this.dom = dom;
    this.toggleBtn = this.dom.get(toggleSelector);
    this.currentTheme = 'dark';
  }

  init() {
    if (!this.toggleBtn) return;

    // Check localStorage or OS preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.currentTheme = savedTheme;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      this.currentTheme = 'light';
    }

    this.applyTheme(this.currentTheme);

    this.toggleBtn.addEventListener('click', () => {
      this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
      this.applyTheme(this.currentTheme);
    });
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Toggle icons
    const sunIcon = this.toggleBtn.querySelector('.icon-sun');
    const moonIcon = this.toggleBtn.querySelector('.icon-moon');
    
    if (theme === 'light') {
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = 'block';
    } else {
      if (sunIcon) sunIcon.style.display = 'block';
      if (moonIcon) moonIcon.style.display = 'none';
    }
  }
}
