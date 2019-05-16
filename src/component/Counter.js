import React,{Component} from 'react';
import PropTypes from 'prop-types';
import connect from '../redux-react/connect';
import actions from '../store/counter-actions';

@connect(state=> (state.counter),actions)
class Counter extends Component{

    static propTypes = {
        number: PropTypes.number.isRequired,
        increment:  PropTypes.func.isRequired,
        decrement:  PropTypes.func.isRequired,
    }


    render(){
        const { number } = this.props;
        return (
            <div>
                <h4>{number}</h4>
                <button onClick={this.props.increment}>加</button>
                <button onClick={this.props.decrement}>减</button>
            </div>
        )
    }
}
export default Counter;