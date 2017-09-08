// @flow

import React, { Component } from "react";
import styled from 'styled-components';

const Wrapper = styled.div`
	border: solid blue 2px;
	flex-grow: 1;
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

const DeleteIconWrapper = styled.div`
	/*border: solid orange 2px;*/
	display: flex;
	position: relative;
	/*flex-shrink: 0;	*/
	min-width: 70px;
`

const DeleteIcon = styled.div`
	/*border: solid pink 2px;*/
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;

	min-width: 70px;
	min-height: 70px;
	color: #353535;
	&:hover {
	/*color: #ad3737;*/
		color: #ad3737;
	};
`

interface Props {
	search_value: string;
	setSearchValue: (value: string) => typeof undefined;
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
    	const {
    		search_value,
    		setSearchValue,
    	} = this.props;
        return (
            <Wrapper>
                <Input
                	value={search_value}
                	onChange={(event) => setSearchValue(event.target.value)}
                	placeholder={'Search...'}/>
                {search_value &&
                	<DeleteIconWrapper
                		onClick={() => setSearchValue('')}>
                		<DeleteIcon>
                			<i 
                				className="fa fa-2x fa-times" 
                				aria-hidden="true"/>
                		</DeleteIcon>
                	</DeleteIconWrapper>
                }
            </Wrapper>
        );
    }
}
