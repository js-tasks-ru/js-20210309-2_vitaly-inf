export default class SortableTable {
  element;
  subElement = {};
  constructor(header = [], { data } = {}) {
    this.header = header;
    this.data = data;
    this.render();
    this.sort();
  }

  get template() {
    return `
       <div class="sortable-table">
          <div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.getHeader()}
        ${this.getArrow()}
          </div>
          <div data-element="body" class="sortable-table__body">
         ${this.getBody(this.data)}
          </div>
       </div>
       `;
  }

  getHeader() {
    return this.header
      .map((item) => {
        return `<div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}" data-order="asc">
       <span>${item.title}</span>
     </div>`;
      })
      .join("");
  }
  getBody() {
    return this.data
      .map((item) => {
        return `<a href="/products/${item.id}" class="sortable-table__row">
          ${this.getBodyRow(item)}
      `;
      })
      .join("");
  }
  getArrow() {
    return `<span data-element="arrow" class="sortable-table__sort-arrow">
    <span class="sort-arrow"></span>
          </span>`;
  }
  getBodyRow(value) {
    return this.header
      .map((item) => {
        if (item.template) {
          return item.template(value[item.id]);
        } else {
          return `<div class="sortable-table__cell">${value[item.id]}</div>`;
        }
      })
      .join("");
  }

  render() {
    const element = document.createElement("div");
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
    this.getSubElements(this.element);
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

  sort(arr, param){
    const headers = this.getSubElements(this.element).header;
    
    headers.addEventListener('click', (event) => {
      this.sortResult();
    });
        
  }
  sortResult(){
    this.sort(arr,param);
    this.sortData();
  } 
  

  


}
