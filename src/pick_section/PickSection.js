// @flow

import React, { Component } from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SECTIONS } from 'setup/constants';
import type { section } from 'app/App';

const Wrapper = styled.nav`
    border: solid 1px orange;

    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    min-width: 200px;    


    user-select: none;
    font-size: 14px;
    text-decoration: none;
`

const HomeSection = styled.div`
    border: solid 1px blue;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 10px;
    /* option for different styles on the home button?? */
    background: ${props => props.section === props.selected_section ? "black" : "white"};
    color: ${props => props.section === props.selected_section ? "white" : "black"};
    cursor: pointer;
`

const Section = styled.div`
    border: solid 1px blue;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 10px;
    background: ${props => props.section === props.selected_section ? "black" : "white"};
    color: ${props => props.section === props.selected_section ? "white" : "black"};
    cursor: pointer;
`

const ScrollContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
`


interface Props {
    selectSection: (new_val: section) => typeof undefined;
    selected_section: section;
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
                <Link
                    key={'home'}
                    style={{ textDecoration: 'none' }}
                    to={'/home'}>
                    <HomeSection
                        selected_section={this.props.selected_section}
                        section={'home'}
                        key={'home'}>
                        {'home'}
                    </HomeSection>
                </Link>
                <ScrollContainer>
                    {SECTIONS.map((section) => {
                        return (
                            <Link
                                key={section}
                                style={{ textDecoration: 'none' }}
                                to={`/${section}`}>
                                <Section
                                    selected_section={this.props.selected_section}
                                    section={section}
                                    key={section}>
                                    {section}
                                </Section>
                            </Link>
                        );
                    })}
                </ScrollContainer>
            </Wrapper>
        );
    }
}
