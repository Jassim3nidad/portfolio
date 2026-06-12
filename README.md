# Jassim Trinidad | Full-Stack & Cybersecurity Developer Portfolio

Interactive developer portfolio showcasing full-stack web applications, cybersecurity threat detectors, and robust automation pipelines.

Live Website: [https://jassim3nidad.vercel.app](https://jassim3nidad.vercel.app)  
GitHub Repo: [https://github.com/Jassim3nidad/portfolio](https://github.com/Jassim3nidad/portfolio)

---

## 🚀 Key Features

1. **3D Interactive Hero**: A premium, modern hero section powered by a Spline 3D interactive viewer.
2. **Interactive Developer Terminal Shell**: A simulated mock console in the About section where visitors can type commands (e.g., `help`, `skills`, `projects`, `contact`) to retrieve styled JSON/text outputs directly.
3. **Dynamic Theme Switching**: Seamlessly toggle between a premium Dark Mode and a crisp Light Mode.
4. **Laser Trailing Pointer**: A fluid, interactive mouse-following laser with a dynamic trailing shadow particle effect in the hero section.
5. **Smooth Category Project Filters**: Interactive categories toggle bar (`All Projects`, `Full-Stack`, `Cybersecurity`, `Automation`) allowing quick filtering with smooth CSS layout animations.
6. **No-Show Killer Automation Pipeline Modal**: Clicking "View Pipeline" on the featured project triggers a blurred-backdrop modal detailing the live Zapier automation pipeline integrations (Google Calendar, Gmail API, Semaphore PH SMS API, and Webhooks).

---

## 🛠️ Tech Stack & Skills

- **Frontend**: HTML5, CSS3, JavaScript (ES6+), TypeScript, React 18, Tailwind CSS, D3.js (Data Visualizations), Bootstrap.
- **Backend & APIs**: Node.js, Express.js, PHP, Python, Kotlin, REST APIs, Webhooks.
- **Databases & DevOps**: MySQL, MongoDB Atlas, Firebase, SQLite, Git, GitHub.
- **Automation & Tools**: Zapier, Webhook routes, Asana CRM, Android Studio.
- **Core Concepts**: Cybersecurity Basics, OOP, Data Structures & Algorithms, Systems Analysis & Design, UML Diagramming.

---

## 💻 Running Locally

This is a static web application that requires no complex compilation steps.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Jassim3nidad/portfolio.git
   ```
2. **Launch a local server**:
   - For VS Code: Right-click `jassim_portfolio.html` and select **Open with Live Server**.
   - Or run a local python server:
     ```bash
     python -m http.server 8000
     ```
     Then navigate to `http://localhost:8000/jassim_portfolio.html` in your browser.

---

## 📁 File Structure

- `jassim_portfolio.html`: Main portfolio template structure and CSS custom design theme.
- `noshowkiller-pipeline.png`: Attached automation integration blueprint diagram.
- `js/`:
  - `dom-helper.js`: Lightweight DOM wrapper utilities.
  - `active-navigation-controller.js`: Active navbar links highlighting on page scroll.
  - `scroll-animation-controller.js`: Scroll-intersection fade-up elements observer.
  - `interactive-console.js`: Interactive developer shell widget logic.
  - `project-filter.js`: Project tags filtering and CSS animations.
  - `pipeline-modal.js`: Zapier modal window transitions.
  - `portfolio-app.js`: Main application coordinator class.
  - `main.js`: DOM loaded event bootstrap entry.
