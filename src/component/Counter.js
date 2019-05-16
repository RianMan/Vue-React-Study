import React,{Component} from 'react';
import store from '../store/store';
import actions from '../store/counter-actions';
import {bindActionCreator} from '../../redux';

let actionsObj = bindActionCreator(actions,store.dispatch)


class Counter extends Component{

    state = {
        number: store.getState().counter.number,
    }

    componentWillMount(){
        store.subscribe(() => {this.setState({number:store.getState().counter.number})})
    }

    render(){
        const { number } = this.state;
        return (
            <div>
                <h4>{number}</h4>
                <button onClick={actionsObj.increment}>加</button>
                <button onClick={actionsObj.decrement}>减</button>
            </div>
        )
    }
}
export default Counter;