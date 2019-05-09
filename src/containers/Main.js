import React,{Component} from 'react';
import {HashRouter as Router,Route ,Link} from 'react-router-dom';
// import {HashRouter as Router,Route,Link} from '../../react-router-dom';
import Home from './Home';
import User from './User';


function Main(){
    return (
        <Router>
            <Link to="/home"><button>首页</button></Link>
            <Link to="/user"><button>用户中心</button></Link>
            <br />
            <br />
            <br />
            <Route path='/home' render={props => <Home {...props} />} />
            <Route path='/user' component={User} />
        </Router>
    )
}

export default Main;