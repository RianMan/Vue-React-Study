import React,{Component} from 'react';
import PropTypes from 'prop-types';


export default class HashRouter extends Component {
    
    static childContextTypes = {
        location: PropTypes.string,
        history:  PropTypes.object,
        match:  PropTypes.object,
    }

    getChildContext(){
        return {
            location: this.state.location,
            history:{
                push: (path)=>{
                    window.location.hash = path;
                }
            },
            match:{
               
            },
        }
    }

    state = {
        location: '',
    }
    

    componentDidMount(){
        let that = this;
        this.setState({
            location: window.location.hash.slice(1)
        })
        window.addEventListener('hashchange',(e) => {
            that.setState({
                location: window.location.hash.slice(1)
            })
        })
    }

    render(){
        return this.props.children
    }
}