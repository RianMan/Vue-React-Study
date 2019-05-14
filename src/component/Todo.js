import React,{Component} from 'react';
import store from '../store';

console.log(store.getState().todo)

class TodoList extends Component{

    state = {
        list: store.getState().todo.items,
    }

    componentDidMount(){
        this.unsubscribe = store.subscribe(()=>{
            this.setState({list: store.getState().todo.items })
        })
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    handleInput = (e) => {
        if(e && e.keyCode === 13){
            store.dispatch({
                type: 'ADDITEM',
                content: e.target.value
            })
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
                        {v.content} &nbsp;&nbsp;&nbsp;
                        <i onClick={()=>{
                            store.dispatch({
                                type: 'DELITEM',
                                index: index
                            })
                        }}>删除</i> 
                    </li>)}
                </ul>
            </div>
        )
    }
}
export default TodoList;