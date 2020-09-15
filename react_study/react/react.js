import $ from 'jquery';
import { createUnit } from './unit';
import { createElement } from './element';



function render(element,container){
    let unit = createUnit(element);
    let markUp = unit.getMarkUp();
    $(container).html(markUp);
}

let React ={ 
    render,
    createElement,
}

export default React;