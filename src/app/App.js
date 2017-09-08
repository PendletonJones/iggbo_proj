// @flow

import React, { Component } from "react";
import styled from 'styled-components';
import PickSection from 'pick_section/PickSection';
import DisplayStories from 'display_stories/DisplayStories';
import retrieveResults from 'data/retrieveResults';
import SearchBar from 'search/SearchBar';
import Immutable, { fromJS } from 'immutable';

export type section =
    'home'
    | 'opinion'
    | 'world'
    | 'national'
    | 'politics'
    | 'upshot'
    | 'nyregion'
    | 'business'
    | 'technology'
    | 'science'
    | 'health'
    | 'sports'
    | 'arts'
    | 'books'
    | 'movies'
    | 'theater'
    | 'sundayreview'
    | 'fashion'
    | 'tmagazine'
    | 'food'
    | 'travel'
    | 'magazine'
    | 'realestate'
    | 'automobiles'
    | 'obituaries'
    | 'insider';


const Wrapper = styled.div`
    flex-grow: 1;
    display: flex;
    border: solid 1px green;
    /*height: 100%;*/
`

const LoadingView = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border: solid 1px green;
    /*height: 100%;*/
`

const MainContent = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    border: solid 1px blue;
`

interface Props {

}

interface State {
    fetched_data: Immutable.List;
}


export default class App extends Component {
    state: State
    constructor(props: Props){
        super(props);
        this.state = {
            fetched_data: Immutable.List(),
            loading_options: false,
        };
    }
    componentWillReceiveProps({match}){
        console.log('App match', match);
        if(match.params.section !== this.props.match.section){
            this.loadSection(match.params.section);
        }
    }
    loadSection = (new_section: section) => {
        if(this.state.selected_section !== new_section){
            this.setState({loading_options: true});
            retrieveResults(new_section)
                .then((response) => {
                    this.setState({fetched_data: fromJS(response.body.results)});
                    this.setState({loading_options: false});
                })
                .catch((err) => {
                    console.warn(err);
                    this.setState({loading_options: false});
                })
        }
    }
    render() {
        const { match } = this.props;
        return (
            <Wrapper>
                <PickSection
                    selected_section={match.params.section}/>
                <MainContent>
                    <SearchBar/>
                    {this.state.loading
                        ?
                            <LoadingView>
                                Loading...
                            </LoadingView>
                        :
                            <DisplayStories
                                fetched_data={this.state.fetched_data}/>
                    }
                </MainContent>
            </Wrapper>
        );
    }
}
