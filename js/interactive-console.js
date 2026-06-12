class InteractiveConsole {
  constructor({ dom, containerSelector = '.terminal-container' }) {
    this.dom = dom;
    this.container = this.dom.get(containerSelector);
    this.input = null;
    this.output = null;
    this.history = [];
    this.commands = {
      help: () => `Available commands:
  about    - Show information about me
  skills   - List my full-stack skills
  projects - View featured projects
  contact  - Get my contact links
  whoami   - Display current user
  sudo     - Execute a command as superuser
  matrix   - Initialize the Matrix protocol
  clear    - Clear the terminal screen`,
      about: () => `I'm Jassim Eman M. Trinidad, a BS Computer Science student majoring in Software Engineering at LPU Cavite. I specialize in full-stack development, cybersecurity, and automation.`,
      skills: () => `[Frontend]
  React 18, JavaScript (ES6+), TypeScript, Tailwind CSS, D3.js, HTML & CSS
[Backend & DBs]
  Node.js, Express, PHP, Python, Kotlin, MySQL, SQLite, Firebase, MongoDB
[Tools & Workflows]
  Git, GitHub, Zapier, Webhooks, REST APIs, Android Studio`,
      projects: () => `1. No-Show Killer Booking Engine (Full-Stack/Automation)
   React, Node.js, Express, MongoDB Atlas, Zapier, Semaphore SMS.
2. ML Intrusion Detection System (Security/AI)
   Python, SQLite, Machine Learning, network anomaly detection.
3. AI Anomaly Detector (Data/AI)
   PHP, D3.js, interactive outliers detection.`,
      contact: () => `Email    : trinidad.softwareengr@gmail.com
Phone    : +63 995 105 7523
LinkedIn : linkedin.com/in/jassim-trinidad
GitHub   : github.com/Jassim3nidad`,
      clear: () => {
        this.output.innerHTML = '';
        return '';
      },
      whoami: () => `guest@jassim-portfolio-v1`,
      sudo: () => `jassim is not in the sudoers file. This incident will be reported.`,
      matrix: () => {
        this.triggerMatrix();
        return `Wake up, Neo...`;
      }
    };
  }

  triggerMatrix() {
    let canvas = document.getElementById('matrix-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'matrix-canvas';
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.zIndex = '9999';
      canvas.style.pointerEvents = 'none';
      canvas.style.opacity = '0.7';
      document.body.appendChild(canvas);

      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
      const fontSize = 16;
      const columns = canvas.width / fontSize;
      const drops = [];
      for (let x = 0; x < columns; x++) drops[x] = 1;

      const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
          const text = letters.charAt(Math.floor(Math.random() * letters.length));
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
          drops[i]++;
        }
      };

      const interval = setInterval(draw, 33);

      // Stop after 5 seconds
      setTimeout(() => {
        clearInterval(interval);
        canvas.style.transition = 'opacity 2s';
        canvas.style.opacity = '0';
        setTimeout(() => canvas.remove(), 2000);
      }, 5000);
    }
  }

  init() {
    if (!this.container) return;

    this.output = this.container.querySelector('.terminal-output');
    this.input = this.container.querySelector('.terminal-input');
    
    if (this.input) {
      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.handleCommand(e.target.value.trim());
          e.target.value = '';
        }
      });
    }

    this.printLine('Jassim Trinidad Developer Shell v1.0.0');
    this.printLine('Type "help" to see available commands.');
    this.printLine('');
  }

  handleCommand(cmdString) {
    if (!cmdString) return;

    const parts = cmdString.split(' ');
    const lowerCmd = parts[0].toLowerCase();
    this.printLine(`jassim@developer:~$ ${cmdString}`, 'prompt-line');

    if (lowerCmd === 'sudo') {
      this.printLine(this.commands.sudo(), 'error-line');
    } else if (this.commands[lowerCmd]) {
      const result = this.commands[lowerCmd]();
      if (result) {
        this.printLine(result);
      }
    } else {
      this.printLine(`command not found: ${cmdString}. Type "help" for a list of commands.`, 'error-line');
    }

    this.scrollToBottom();
  }

  printLine(text, className = '') {
    const line = document.createElement('div');
    if (className) {
      line.classList.add(className);
    }
    line.style.whiteSpace = 'pre-wrap';
    line.textContent = text;
    this.output.appendChild(line);
  }

  scrollToBottom() {
    if (this.container) {
      const scrollBody = this.container.querySelector('.terminal-body');
      if (scrollBody) {
        scrollBody.scrollTop = scrollBody.scrollHeight;
      }
    }
  }
}
