import React,{Component} from 'react';
import PropTypes from 'prop-types';
import pathToRegexp from 'path-to-regexp';


export default class Route extends Component{
    static contextTypes = {
        location:PropTypes.string,
        history: PropTypes.object,
        match: PropTypes.object,
    }


    render(){
        const { path,component:Component} = this.props;
        const  {location,match} = this.context;
        let keys = []
        const regexp = pathToRegexp(path, keys,{end:false});
        keys = keys.map(v => v.name);
        if(location.match(regexp)){
            console.log(Component)
            const [local,...rest] = regexp.exec(location);
            let params = keys.reduce((memo,cur,idx) => {
                memo[cur] = rest[idx];
                return memo;
            },{})
            match.params = params;
            match.url = location;
            match.pathname = path;
            return <Component {...this.context} />;
        }
        return null;
    }
}