import fetchJson from "./utils/fetch-json.js";
const BACKEND_URL = "https://course-js.javascript.ru/";

export default class ColumnChart {
  chartHeight = 50;

  constructor({
    url = "",
    range = {},
    label = "",
    link = "",
    formatHeading = (data) => data,
  } = {}) {
    this.url = new URL(url, BACKEND_URL);
    this.range = range;
    this.label = label;
    this.link = link;

    this.formatHeading = formatHeading;

    this.render();
  }

  get template() {
    return `<div class="column-chart column-chart_loading" style="--chart-height: ${
      this.chartHeight
    }">
      <div class="column-chart__title">
        Total ${this.label}
        ${this.getLink()}
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">${
          this.formatHeading
        }</div>
        <div data-element="body" class="column-chart__chart">
        </div>
      </div>
    </div>`;
  }
  getLink() {
    if (this.link) {
      return `<a href="${this.link}" class="column-chart__link">View all</a>`;
    }
    return "";
  }
  render() {
    const element = document.createElement("div");
    element.innerHTML = this.template;

    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this.element);
    this.update(this.range.from, this.range.to);
  }
  getSubElements(element) {
    const obj = {};
    const elements = element.querySelectorAll("[data-element]");

    for (let key of elements) {
      const name = key.dataset.element;
      obj[name] = key;
    }
    return obj;
  }

  remove() {
    this.element.remove();
  }
  destroy() {
    this.remove();
  }

  drawColumn(arr) {
    if (arr.length) {
      this.element.classList.remove("column-chart_loading");
    }

    const maxValue = Math.max(...arr);
    const scale = this.chartHeight / maxValue;

    const updateValue = arr
      .map((item) => {
        const value = String(Math.floor(item * scale));
        const percent = ((item / maxValue) * 100).toFixed(0);
        return `
                <div style="--value: ${value}" data-tooltip="${percent}%"></div>   
                `;
      })
      .join("");
    const sumArr = arr.reduce((item, current) => item + current, 0);
    this.subElements.header.innerHTML = sumArr;
    this.subElements.body.innerHTML = updateValue;
  }
  async update(fromRange, toRange) {
    let json = await fetchJson(this.url.toString());
    const arr = [];
    for (const [key, value] of Object.entries(json)) {
      if (fromRange <= new Date(key) && new Date(key) <= toRange) {
        arr.push(value);
      }
    }
    this.drawColumn(arr);
  }
}
