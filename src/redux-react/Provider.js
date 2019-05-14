import React,{Component} from 'react';
import Protypes from 'prop-types';

class Provider extends Component{

    static childrenContextTypes={
        store: Protypes.object.isRequired,
    }

    render(){
        return this.props.children;
    }
}

export default Provider;