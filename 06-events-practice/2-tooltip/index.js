class Tooltip {
  static instance;
  onPointerOver = (event) => {
    const element = event.target.closest("[data-tooltip]");
    if (!element) {
      return;
    }
    this.render(element.dataset.tooltip);
    this.moveTooltip(event);
    document.body.addEventListener('pointermove', this.onPointerMove);
  };
  onPointerMove = (event) =>{
     this.moveTooltip(event);
  };
  onPointerOut = () => {
      this.removeToolTip();
  };
  constructor() {
    if (Tooltip.instance) {
      Tooltip.instance = this;
    }
    return Tooltip.instance;
  }
  initEventListener() {
    document.body.addEventListener("pointerover", this.onPointerOver);
    document.body.addEventListener("pointerout", this.onPointerOut);
  }

  initialize() {
    this.initEventListener();
  }

  render(html = "") {
    const element = document.createElement("div");
    element.classList.add("tooltip");
    element.innerHTML = html;
    this.element = element;
    document.body.append(element);
  }
  
  moveTooltip(event){
      const shift = 10;
      this.element.style.left = event.pageX + shift + "px";
      this.element.style.top = event.pageY + shift + "px";
  }
  
  removeToolTip(){
      if (this.element) {
          this.element.remove();
          this.element = null;
          document.removeEventListener('pointermove', this.onPointerMove);
        }
  }
  destroy() {
    this.element = null;
    document.removeEventListener('pointerover', this.onMouseOver);
    document.removeEventListener('pointerout', this.onMouseOut);
    this.removeToolTip();
  }
}
const tooltip = new Tooltip();
export default tooltip;