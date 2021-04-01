class Tooltip {
    show = (event) =>{
        const allData = event.target.closest('[data-tooltip]');
        if(!allData){
            return;
        }    
        this.element.innerText = allData.dataset.tooltip;
        
        this.element.style.left = event.pageX + 10 + 'px';
        this.element.style.top = event.pageY + 10 + 'px';

        document.body.append(this.element);
    }
    hidden = () =>{
        this.destroy();
    }
    constructor(){
        this.render();
    }
    getTemplate(){
      return `<div class="tooltip">This is tooltip</div>`; 
    }
    render(){
        const element = document.createElement('div');
        element.innerHTML = this.getTemplate();
        this.element = element.firstElementChild;
    }
    initialize (){
        this.initEventListener();
        
    }    
    initEventListener(){
       
        document.body.addEventListener('pointermove', this.show, {
                bubbles:true,
            });

        document.body.addEventListener('pointerover', this.show, {
            bubbles:true
        });
        document.body.addEventListener('pointerout', this.hidden, {
            bubbles:true
        });
    
    }
    remove(){
        this.element.remove();
    }
    destroy(){
        this.remove();
    }
}
const tooltip = new Tooltip();
export default tooltip;