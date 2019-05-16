import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreator } from '../../redux';

function connect(mapToState,mapDispatchToProps){
    return function(WarpedComponent){
        class Page extends Component{
            static contextTypes = {
                store: PropTypes.object,
            }
        
            constructor(props,context){
                super(props)
                this.store = context.store;

                this.state = mapToState(this.store.getState())
            }
        
        
            componentWillMount(){
                this.unsubscribe =  this.store.subscribe(() => {this.setState(mapToState(this.store.getState()))})
            }
        
            componentWillUnmount(){
                this.unsubscribe();
            }

            render(){
                let actionsObj = {};
                console.log(mapDispatchToProps)
                actionsObj  = bindActionCreator(mapDispatchToProps, this.store.dispatch)
                return <WarpedComponent {... this.state} {...actionsObj} />
            }
        }
        return Page;
    }
}

export default connect;