// @flow
    
import React, { Component } from "react";
import styled from 'styled-components';

const Wrapper = styled.div`

`

interface Props {

}

interface State {

}

export default class App extends Component {
    state: State
    constructor(props: Props){
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Wrapper>
                App                
            </Wrapper>
        );
    }
}
