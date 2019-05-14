import React,{Component} from 'react';
import store from '../store';
import counter from '../actions/counter';
import {bindActionCreator} from '../../redux'

let newAction = bindActionCreator(counter,store.dispatch)

class Counter extends Component{

    state = {
        number: store.getState().counter.number,
    }

    componentDidMount(){
        this.unsubscribe = store.subscribe(()=>{
            this.setState({number: store.getState().counter.number })
        })
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    render(){
        const { number } = this.state;
        return (
            <div>
                <h4>{number}</h4>
                <button onClick={newAction.increment}>加</button>
                <button onClick={newAction.decrement}>减</button>
            </div>
        )
    }
}
export default Counter;