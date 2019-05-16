import React,{Component} from 'react';
import store from '../store/store';
import todoAction from '../store/todo-actions';
import { bindActionCreator } from '../../redux';

let newActions = bindActionCreator(todoAction,store.dispatch)

console.log(store.getState())
class TodoList extends Component{

    state = {
        list: store.getState().todo
    }

    componentWillMount(){
        store.subscribe(()=>{
            this.setState({
                list: store.getState().todo
            })
        })
    }

    handleInput = (e) => {
        if(e.keyCode === 13){
            newActions.addItemAction(e.target.value)
        }
    }

    render(){
        const { list } = this.state;
        console.log(list)
        return (
            <div>
                <input onKeyDown={this.handleInput} />
                <ul>
                    {list && list.map((v,index)=> 
                    <li key={index}> 
                        {v} &nbsp;&nbsp;&nbsp;
                        <i onClick={()=>{
                            newActions.delItemAction(index)
                        }}>删除</i> 
                    </li>)}
                </ul>
            </div>
        )
    }
}
export default TodoList;