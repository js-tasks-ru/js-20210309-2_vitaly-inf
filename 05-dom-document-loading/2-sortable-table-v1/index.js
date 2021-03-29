export default class SortableTable {
    constructor(header = [], data = {}) {
      this.header = header;
      this.data = data;
      this.render();
    }
    get template() {
      return `<div data-element="productsContainer" class="products-list__container">
          <div class="sortable-table">
            <div data-element="header" class="sortable-table__header sortable-table__row">
              <div class="sortable-table__cell" data-id="images" data-sortable="false" data-order="asc">
                <span>Image</span>
              </div>
              <div class="sortable-table__cell" data-id="title" data-sortable="true" data-order="asc">
                <span>Name</span>
                <span data-element="arrow" class="sortable-table__sort-arrow">
                  <span class="sort-arrow"></span>
                </span>
              </div>
              <div class="sortable-table__cell" data-id="title" data-sortable="true" data-order="asc">
                <span>Quantity</span>
              </div>
              <div class="sortable-table__cell" data-id="quantity" data-sortable="true" data-order="asc">
                <span>Price</span>
              </div>
              <div class="sortable-table__cell" data-id="price" data-sortable="true" data-order="asc">
                <span>Sales</span>
              </div>
            </div>`;
    }
    render() {
      const element = document.createElement('div');
      element.innerHTML = this.template;
      document.body.append(element);
      this.element = element.firstElementChild;
      this.update(element);
    }
    remove() {
      this.element.remove();
    }
    destroy() {
      this.remove();
    }
    sort(arr, param) {
      const newArr = [...arr];
      newArr.sort(function (a, b) {
        return a.localeCompare(b, ["ru", "en"], {
          caseFirst: "upper",
        });
      });
      if (param === "desc") {
        return newArr.sort(function (a, b) {
          return b.localeCompare(a, ["ru", "en"], {
            caseFirst: "upper",
          });
        });
      }
      return newArr;
    }
    update(element) {
      for (const value of Object.values(this.data)) {
        for (const value1 of value) {
          element.insertAdjacentHTML('beforeend', `<div data-element="body" class="sortable-table__body">
          <a href="${this.data}" class="sortable-table__row">
          <div class="sortable-table__cell">
            <img class="sortable-table-image" alt="Image" src="${value1.images[0].url}">
          </div>
          <div class="sortable-table__cell">${value1.title}</div>
          <div class="sortable-table__cell">${value1.quantity}</div>
          <div class="sortable-table__cell">${value1.price}</div>
          <div class="sortable-table__cell">${value1.sales}</div>
        </a>`);
        }
      }
      document.querySelector();
    }
  }