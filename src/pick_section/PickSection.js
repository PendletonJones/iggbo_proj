// @flow

import React, { Component } from "react";
import styled from 'styled-components';
import { SECTIONS } from 'setup/constants';

const Wrapper = styled.div`

`

const Section = styled.div`
	border: solid 1px blue;
`


interface Props {

}

interface State {

}

export default class PickSection extends Component {
    state: State
	constructor(props: Props){
		super(props);
		this.state = {};
	}
    render() {
        return (
            <Wrapper>
                PickSection
                {SECTIONS.map((section) => {
                	return (
                		<Section>
                			section
                		</Section>
                	);
                })}
            </Wrapper>
        );
    }
}
