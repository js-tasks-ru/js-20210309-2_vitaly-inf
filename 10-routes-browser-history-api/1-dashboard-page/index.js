import RangePicker from "./components/range-picker/src/index.js";
import SortableTable from "./components/sortable-table/src/index.js";
import ColumnChart from "./components/column-chart/src/index.js";
import header from "./bestsellers-header.js";

import fetchJson from "./utils/fetch-json.js";

const BACKEND_URL = "https://course-js.javascript.ru/";

export default class Page {
  element;
  subElements = {};
  components = {};

  async updateComponents(from, to) {
    const data = await fetchJson(
      `${BACKEND_URL}api/dashboard/bestsellers?_start=1&_end=21&from=${from.toISOString()}&to=${to.toISOString()}&_sort=title&_order=asc`
    );
    this.components.sortableTable.addRows(data);

    this.components.ordersChart.update(from, to);
    this.components.salesChart.update(from, to);
    this.components.customersChart.update(from, to);
  }

  initComponents() {
    const now = new Date();
    const to = new Date();
    const from = new Date(now.setMonth(now.getMonth() - 1));

    const rangePicker = new RangePicker({ from, to });

    const sortableTable = new SortableTable(header, {
      url: `api/dashboard/bestsellers?from=${from.toISOString()}&to=${to.toISOString()}`,
      isSortLocally: false,
    });

    const ordersChart = new ColumnChart({
      url: "api/dashboard/orders",
      range: {
        from,
        to,
      },
      label: "orders",
      link: "#",
    });

    const salesChart = new ColumnChart({
      url: "api/dashboard/sales",
      range: {
        from,
        to,
      },
      label: "sales",
      formatHeading: (data) => `$${data}`,
    });

    const customersChart = new ColumnChart({
      url: "api/dashboard/customers",
      range: {
        from,
        to,
      },
      label: "customers",
    });

    this.components = {
      rangePicker,
      sortableTable,
      ordersChart,
      salesChart,
      customersChart,
    };
  }

  renderComponents() {
    Object.keys(this.components).forEach((item) => {
      const root = this.subElements[item];
      const { element } = this.components[item];

      root.append(element);
    });
  }

  get template() {
    return `
                <div class = 'dashboard'>
                    <div class = 'content__top-panel'>
                        <h2 class = 'page-title'>Dashboard</h2>
    
                        <div data-element='rangePicker'></div>
                    </div>
                    <div data-element = 'chartsRoot' class = 'dashboard__charts'>
    
                            <div data-element = 'ordersChart' class = 'dashboard__chart_orders'></div>
                            <div data-element = 'salesChart' class = 'dashboard__chart_sales'></div>
                            <div data-element = 'customersChart' class = 'dashboard__chart_customers'></div>
                
                    </div>
                    <h3 class = 'block-title'>Best Sellers</h3>
    
                    <div data-element='sortableTable'>
                    </div>
                </div>`;
  }

  render() {
    const element = document.createElement("div");
    element.innerHTML = this.template;

    this.element = element.firstElementChild;

    this.subElements = this.getSubElements(this.element);

    this.initComponents();
    this.renderComponents();
    this.initEventListener();

    return this.element;
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

  initEventListener() {
    this.components.rangePicker.element.addEventListener(
      "date-select",
      (event) => {
        const { from, to } = event.detail;

        this.updateComponents(from, to);
      }
    );
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();

    for (const value of Object.values(this.components)) {
      value.destroy();
    }
  }
}
