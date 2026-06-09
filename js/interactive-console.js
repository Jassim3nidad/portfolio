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
      }
    };
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

    const lowerCmd = cmdString.toLowerCase();
    this.printLine(`jassim@developer:~$ ${cmdString}`, 'prompt-line');

    if (this.commands[lowerCmd]) {
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
