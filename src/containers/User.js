import React,{Component} from 'react';

class User extends Component{
    render(){
        console.log(this.props);
        return <h1>Hello User</h1>
    }
}

export default User;