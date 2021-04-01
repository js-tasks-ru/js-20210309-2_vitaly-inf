export default class NotificationMessage {
  static currentNotification;
  constructor(string = "", { duration = 0, type = "" } = {}) {
    this.string = string;
    this.duration = duration;
    this.type = type;
    this.method();
    this.render();
  }
  method() {
    if (NotificationMessage.currentNotification) {
      NotificationMessage.currentNotification.remove();
    }
  }
  get template() {
    return `<div class="notification ${this.type}" style="--value:${
      this.duration / 1000
    }s">
      <div class="timer"></div>
      <div class="inner-wrapper">
        <div class="notification-header">${this.type}</div>
        <div class="notification-body">
          ${this.string}
        </div>
      </div>
    </div>`;
  }
  render() {
    const element = document.createElement("div");
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
    NotificationMessage.currentNotification = this.element;
    return NotificationMessage.currentNotification;
  }
  remove() {
    this.element.remove();
  }
  destroy() {
    this.remove();
  }
  show(sub = document.body) {
    sub.append(this.element);
    setTimeout(() => this.destroy(), this.duration);
  }
}