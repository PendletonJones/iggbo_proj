// @flow

import React, { Component } from "react";
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	min-height: 70px;
`

const Input = styled.input`
	border: solid purple 2px;
	padding: 20px;
	font-size: 24px;
	flex-grow: 1;

	border-bottom-color: darkgrey;
	border-bottom-width: 1px;
	border-bottom-style: solid;
`

interface Props {

}

interface State {

}

export default class SearchBar extends Component {
    state: State
	constructor(props: Props){
		super(props);
		this.state = {};
	}
    render() {
        return (
            <Wrapper>
                <Input
                	placeholder={'Search...'}/>
            </Wrapper>
        );
    }
}
