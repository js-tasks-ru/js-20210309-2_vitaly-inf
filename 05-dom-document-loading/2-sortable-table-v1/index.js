export default class SortableTable {
  element;
  subElements = {};

  constructor(header = [], { data = [] } = {}, ) {
    this.header = header;
    this.data = data;
    this.render();
  }

  get template() {
    return `
       <div class="sortable-table">
          <div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.getHeader()}
          </div>
          <div data-element="body" class="sortable-table__body">
         ${this.getBody(this.data)}
          </div>
       </div>
       `;
  }

  getHeader() {
    return this.header
    .map(item=> `
        <div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}">
          <span>${item.title}</span>
          <span data-element="arrow" class="sortable-table__sort-arrow">
           <span class="sort-arrow"></span>
         </span>
        </div>`)
  .join('');
  }


  getBody(data) {
    return data
    .map(item => {
      return `
      <a href="/products/${item.id}" class="sortable-table__row">
          ${this.getTableRow(item)}`;
    })
    .join('');
  }

  getTableRow(item) {
    const cells = this.header.map(({id,template}) => {
      return {
        id,
        template,
      };
    });

    return cells
    .map(({id, template})=>{
      return template 
      ? template(item[id]) 
      : `<div class="sortable-table__cell">${item[id]}</div>`;
    })
    .join('');
  }

  

  render() {
    const element = document.createElement("div");
    element.innerHTML = this.template;

    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this.element);
  }



  sort(field, order) {
    const allColumns = this.element.querySelectorAll('.sortable-table__cell[data-id]');
    const currentColumn = this.element.querySelector(`.sortable-table__cell[data-id="${field}"]`);
    
    allColumns.forEach(column => {
      column.dataset.order = '';
    });

    currentColumn.dataset.order = order;

    this.subElements.body.innerHTML = this.getBody(this.sortData(field, order));
  }

  sortData(field, order) {
    const arr = [...this.data];
    const column = this.header.find(item => item.id === field);
    const { sortType } = column;
    const directions = {
      asc: 1,
      desc: - 1
    };
    const direction = directions[order];

    return arr.sort((a, b) => {
      switch (sortType) {
      case 'number':
        return direction * (a[field] - b[field]);
      case 'string':
        return direction * a[field].localeCompare(b[field], ['ru', 'en']);
      default:
        return direction * (a[field] - b[field]);
      }
    });
  }
  getSubElements(element) {
    const result = {};
    const elements = element.querySelectorAll('[data-element]');

    for (const subElement of elements) {
      const name = subElement.dataset.element;

      result[name] = subElement;
    }

    return result;
  }
  remove() {
    this.element.remove();
  }
  destroy() {
    this.remove();
    this.subElements = {};
  }
}
