import {Component} from 'react';
import ProtoTypes from 'prop-types';

class Provider extends Component{

    static childContextTypes = {
        store: ProtoTypes.object.isRequired,
    }

    getChildContext(){
        return {
            store: this.props.store,
        }
    }

    render(){
        return this.props.children
    }
}

export default Provider;