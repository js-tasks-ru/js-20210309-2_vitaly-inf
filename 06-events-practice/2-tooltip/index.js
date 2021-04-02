class Tooltip {
    show = (event) =>{
        const allData = event.target.closest('[data-tooltip]');
        if(!allData){
            return;
        }    

        this.element.innerHTML = allData.dataset.tooltip;
        
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

    render(q = ''){
        this.element = document.createElement('div');
        this.element.classList.add('tooltip');
        this.element.innerHTML = q;
        document.body.append(this.element);
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