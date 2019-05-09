import React,{Component} from 'react';
import PropTypes from 'prop-types';



export default class Link extends Component{
    static contextTypes = {
        location:PropTypes.string,
    }


    constructor(props){
        super(props)
    }


    render(){
        const { to } = this.props;
        return <a href={'/#' + to}>{this.props.children}</a>;
    }
}