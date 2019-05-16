import React,{Component} from 'react';
import {HashRouter as Router,Route ,Link} from 'react-router-dom';
// import {HashRouter as Router,Route,Link} from '../../react-router-dom';
import Home from './Home';
import User from './User';
import Counter from '../component/Counter'
import TodoList from '../component/Todo'
import Provider from '../redux-react/Provider';
import store from '../store/store';


function Main(){
    return (
        <Provider store={store}>
            <Router>
                <Link to="/home"><button>首页</button></Link>
                <Link to="/user"><button>用户中心</button></Link>
                <br />
                <br />
                <br />
                <Route path='/home' render={props => <Home {...props} />} />
                <Route path='/user' component={User} />
                <Counter />
                <br />
                <br />
                <TodoList />
            </Router>
        </Provider>
    )
}

export default Main;