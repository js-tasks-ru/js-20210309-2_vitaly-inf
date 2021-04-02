export default class SortableTable {
  element;
  subElements = {};

  eventSort = (event) => {
    const field = event.currentTarget.dataset; 
    
       field.order === '' ? field.order = 'desc' : (field.order === 'desc' ? field.order = 'asc': (field.order === 'asc'? field.order = 'desc': ''));
 
      this.sort(field.id,field.order);
     
   }

  constructor(header = [], { data } = {}) {
    this.header = header;
    this.data = data;
    this.render();
    this.sort('title', 'asc');
    this.initEventListener();
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
      .map((item) => {
        return `<div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}" data-order="asc">
       <span>${item.title}</span>
       <span data-element="arrow" class="sortable-table__sort-arrow">
    <span class="sort-arrow"></span>
          </span>
     </div>`;
      })
      .join("");
  }
  getBody(data) {
    return data
      .map((item) => {
        return `<a href="/products/${item.id}" class="sortable-table__row">
          ${this.getBodyRow(item)}
      `;
      })
      .join("");
  }

  getBodyRow(item) {
    const cells = this.header.map(({id, template}) => {
      return {
        id,
        template
      };
    });

    return cells.map(({id, template}) => {
      return template
        ? template(item[id])
        : `<div class="sortable-table__cell">${item[id]}</div>`;
    }).join('');
  }

  render() {
    const element = document.createElement("div");
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this.element);
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
  initEventListener(){
    const sortableTitles = [...this.subElements.header.querySelectorAll('[data-sortable = "true"]')];
     sortableTitles.forEach(item => {
       item.addEventListener('pointerdown', this.eventSort);
     });
  }
  
  sort(field, order) {
    const sortedData = this.sortData(field, order);
    const allColumns = this.element.querySelectorAll('.sortable-table__cell[data-id]');
    const currentColumn = this.element.querySelector(`.sortable-table__cell[data-id="${field}"]`);

   
    allColumns.forEach(column => {
      column.dataset.order = '';
    });
    
    currentColumn.dataset.order = order;

    this.subElements.body.innerHTML = this.getBody(sortedData);
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
    remove(){
      this.element.remove();
    }
    destroy(){
      this.remove();
      this.subElements = {};
    }
}
