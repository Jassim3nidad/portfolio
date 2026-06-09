class DOMHelper {
  constructor(root = document) {
    this.root = root;
  }

  getAll(selector) {
    return Array.from(this.root.querySelectorAll(selector));
  }

  get(selector) {
    return this.root.querySelector(selector);
  }
}
