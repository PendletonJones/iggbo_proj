// @flow
    
import React, { Component } from "react";
import styled from 'styled-components';
import missing from 'styles/missing.jpg';

interface Props {

}

interface State {
    
}

export default class ImageWithFallback extends Component {
    state: State
	constructor(props: Props){
		super(props);
		this.state = {error: false};
	}
    render() {
    	const { item } = this.props;
    	return (
    		<img
    			onError={() => {
    				/* 
    					Error is never fired even if source is not found?
    					-- change in react behavior? 
    				*/
    				console.warn("Something isn't working, image is not changing source");
    				this.setState({error: true})
    			}}
    			src={this.state.error ? missing : item.getIn(['multimedia', '1', 'url'])}
    			// src={missing}
    		/>
    	);
    }
}
