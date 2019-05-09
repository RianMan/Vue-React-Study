import React,{Component} from 'react';
// import {HashRouter as Router,Route ,Link} from 'react-router-dom';
import { HashRouter as Router, Route} from '../../react-router-dom';

function Collection(props){
    console.log(props,'props');
    return <div style={{width: 200, height:200,backgroundColor:"pink"}}>我的收藏页面</div>
}

function Friend(){
    return <div style={{width: 200, height:200,backgroundColor:"green"}}>我的朋友页面</div>
}

class Home extends Component{


    render(){
        return (
        <Router>
            <button onClick={()=>{this.props.history.push('/home/collection/99')}}>我的收藏</button>    
            <button onClick={()=>{this.props.history.push('/home/friend/000')}}>我的朋友</button>    
            <Route path='/home/collection/:id' component={Collection}/>        
            <Route path='/home/friend/:id' component={Friend}/>        
        </Router>
        )
    }
}

export default Home;