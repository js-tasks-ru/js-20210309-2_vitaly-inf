export default class ColumnChart {
  constructor({
    data = [],
    label = '',
    link = '',
    value = 0,
  } = {}) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = value;
    this.chartHeight = 50;
    this.render();
}
    render(){
        const element = document.createElement('div');
        element.classList.add('dashboard__charts');
        element.innerHTML =  `
        <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
          <div class="column-chart__title">
            Total ${this.label}
          </div>
          <div class="column-chart__container">
            <div data-element="header" class="column-chart__header">${this.value}</div>
            <div data-element="body" class="column-chart__chart">
            </div>
          </div>
        </div>
        `;
        const tools = `<a href="${this.link}" class="column-chart__link">View all</a>`;
        if (this.link){
          element.querySelector('.column-chart__title').insertAdjacentHTML('beforeend', tools);
        }

        this.loading = element.querySelector('.column-chart');
        this.bodyValue = element.querySelector('.column-chart__chart');
        this.update(this.data);
        this.element = element.firstElementChild;
    }
    remove(){
        this.element.remove();
    }
    destroy(){
        this.remove();
    }
    update(data){
      if (data.length){
        this.loading.classList.remove('column-chart_loading');
      }

        const maxValue = Math.max(...this.data);
        const scale = 50 / maxValue;
        
        const updateValue = this.data
        .map(item => {
          const value = String(Math.floor(item*scale));
          const percent = (item/maxValue * 100).toFixed(0);
            return  `
              <div style="--value: ${value}" data-tooltip="${percent}%"></div>   
              `})
        .join('');
      this.bodyValue.innerHTML  = updateValue; 
    }
}