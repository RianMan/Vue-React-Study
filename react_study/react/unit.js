import { Element }  from './element';

class Unit{
    constructor(element){
        this._currentElement = element;
    }
    getMarkUp(){
        throw error('no method')
    }
}

// 文本节点
class TextUnit extends Unit{
    getMarkUp(reactId){
        this._reactId = reactId;
        return `<span data-reactid=${this._reactId}>${this._currentElement}</span>`
    }
}

class NativeUnit extends Unit{
    getMarkUp(reactId){
        this._reactId = reactId;
        let { type, props } = this._currentElement;
        let startTag = `<${type} `;
        let childrenString = ``;
        let endTag = `</${type}>`;
        console.log(type,props,'props')
        for(let propsName in props){
            if(/^on[A-Z]/.test(propsName)){

            }else if(propsName ==='style'){

            }else if(propsName ==='children'){

            }else{
                startTag += (` ${propsName}=${props[propsName]} `)
            }
        }
        return startTag + ' >' + childrenString + endTag;
    }
}

function createUnit(element){
    if(typeof element === 'string' || typeof element === 'number'){
        return new TextUnit(element);
    }

    if(element instanceof Element && typeof element.type === 'string'){
        return new NativeUnit(element);
    }
}

export {
    createUnit,
}