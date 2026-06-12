class LaserPointerController {
  constructor({ dom, heroSelector = '.hero' }) {
    this.dom = dom;
    this.hero = this.dom.get(heroSelector);
    this.dots = [];
    this.history = [];
    this.numDots = 8;
    this.isActive = false;
    this.animationFrame = null;
  }

  init() {
    if (!this.hero) return;

    // Create the dots
    const container = document.createElement('div');
    container.id = 'laser-container';
    
    for (let i = 0; i < this.numDots; i++) {
      const dot = document.createElement('div');
      dot.className = 'laser-dot';
      
      // Scale down trailing dots
      const scale = 1 - (i / this.numDots);
      const size = Math.max(2, 8 * scale);
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      
      container.appendChild(dot);
      this.dots.push(dot);
      this.history.push({ x: -100, y: -100 });
    }
    
    document.body.appendChild(container);

    this.hero.addEventListener('mouseenter', () => {
      this.isActive = true;
      document.body.style.cursor = 'crosshair';
      this.dots.forEach((dot, index) => {
        dot.style.opacity = `${1 - (index / this.numDots)}`;
      });
      this.animate();
    });

    this.hero.addEventListener('mouseleave', () => {
      this.isActive = false;
      document.body.style.cursor = '';
      this.dots.forEach(dot => {
        dot.style.opacity = '0';
      });
      cancelAnimationFrame(this.animationFrame);
    });

    this.hero.addEventListener('mousemove', (e) => {
      if (this.isActive) {
        // Push the new coordinate to the start of the history array
        this.history.unshift({ x: e.clientX, y: e.clientY });
        this.history.pop(); // Remove the oldest coordinate
      }
    });
  }

  animate() {
    if (!this.isActive) return;

    // Apply history positions to the dots
    for (let i = 0; i < this.numDots; i++) {
      const pos = this.history[i];
      if (pos) {
        // Smoothly interpolate between positions for dots lagging behind
        const dot = this.dots[i];
        
        // The head dot exactly follows the mouse, trailing dots follow history
        const currentX = parseFloat(dot.dataset.x || pos.x);
        const currentY = parseFloat(dot.dataset.y || pos.y);
        
        // Linear interpolation for smooth trailing
        const lerpFactor = i === 0 ? 1 : 0.4; 
        const nextX = currentX + (pos.x - currentX) * lerpFactor;
        const nextY = currentY + (pos.y - currentY) * lerpFactor;
        
        dot.dataset.x = nextX;
        dot.dataset.y = nextY;
        
        const size = parseFloat(dot.style.width);
        const offset = size / 2;
        
        dot.style.transform = `translate(${nextX - offset}px, ${nextY - offset}px)`;
      }
    }

    this.animationFrame = requestAnimationFrame(() => this.animate());
  }
}
