import React,{Component} from 'react';
// import store from '../store/store';
import PropTypes from 'prop-types'
import connect from '../redux-react/connect';
import todoAction from '../store/todo-actions';
// import { bindActionCreator } from '../../redux';

// let newActions = bindActionCreator(todoAction,store.dispatch)
@connect(state=>state.todo,todoAction)
class TodoList extends Component{

    static propTypes ={
        list: PropTypes.array,
        addItemAction: PropTypes.func,
        delItemAction: PropTypes.func,
    }


    handleInput = (e) => {
        if(e.keyCode === 13){
            this.props.addItemAction(e.target.value)
        }
    }

    render(){
        const  {list}  = this.props;
        return (
            <div>
                <input onKeyDown={this.handleInput} />
                <ul>
                    {list && list.map((v,index)=> 
                    <li key={index}> 
                        {v} &nbsp;&nbsp;&nbsp;
                        <i onClick={()=>{
                            this.props.delItemAction(index)
                        }}>删除</i> 
                    </li>)}
                </ul>
            </div>
        )
    }
}
export default TodoList;