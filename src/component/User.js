import React,{Component} from 'react';
import PropTypes from 'prop-types';
import connect from '../redux-react/connect';
import actions from '../store/user-actions';

@connect(state=> (state.user), actions)
class User extends Component{

    static propTypes = {
        userData: PropTypes.object.isRequired,
        getUser:  PropTypes.func.isRequired,
    }


    render(){
        const { userData } = this.props;
        return (
            <div>
                <h3>姓名：{userData.name || '暂无'} ， 年龄：{userData.age || '暂无'}</h3>
                <button onClick={() =>{this.props.getUser()}}>获取用户信息</button>

                <button onClick={() =>{this.props.login({password:123456})}}>登陆</button>
            </div>
        )
    }
}
export default User;