class TypewriterController {
  constructor({ dom, selector = '.typewriter-text', speed = 50 }) {
    this.dom = dom;
    this.selector = selector;
    this.speed = speed;
    this.elements = null;
  }

  init() {
    this.elements = this.dom.getAll(this.selector);
    if (!this.elements || this.elements.length === 0) return;

    this.elements.forEach(element => {
      const text = element.innerText;
      element.innerText = '';
      element.style.opacity = '1'; // ensure visible if initially hidden
      
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          element.innerHTML += text.charAt(i);
          i++;
          setTimeout(typeWriter, this.speed);
        }
      };

      // Start after a slight delay for better effect
      setTimeout(typeWriter, 500);
    });
  }
}
