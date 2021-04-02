class Tooltip {
  static instance;

  show = (event) => {
    const allData = event.target.closest("[data-tooltip]");

    if (!allData) {
      return;
    }

    if (this.element) {
      this.element.remove();
    }
    this.render();
    this.element.innerHTML = allData.dataset.tooltip;
    this.element.style.left = event.pageX + 10 + "px";
    this.element.style.top = event.pageY + 10 + "px";
  };

  hidden = () => {
    this.destroy();
  };
  constructor() {
    if (Tooltip.instance) {
      Tooltip.instance = this;
    }
    return Tooltip.instance;
  }

  render(q = "") {
    const element = document.createElement("div");
    element.classList.add("tooltip");
    element.innerHTML = q;
    document.body.append(element);
    this.element = element;
  }
  initialize() {
    this.initEventListener();
  }
  initEventListener() {
    document.body.addEventListener("pointerover", this.show);
    document.body.addEventListener("pointermove", this.show);
    document.body.addEventListener("pointerout", this.hidden);
  }
  remove() {
    this.element.remove();
  }
  destroy() {
    this.remove();
  }
}
const tooltip = new Tooltip();
export default tooltip;
