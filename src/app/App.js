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
    /*border: solid 1px green;*/
    /*height: 100%;*/
`

const LoadingView = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    /*border: solid 1px green;*/
    /*height: 100%;*/
`

const MainContent = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    /*border: solid 1px blue;*/
`

const ToolBar = styled.div`
    /*border: solid red 2px;*/
    min-height: 70px;
    display: flex;
    /*flex-grow: 1;*/
    padding: 10px;
    margin: 10px;
`

const ShowAllButton = styled.div`
    border: solid orange 2px;
    max-width: 200px;
    max-height: 40px;
    flex-grow: 0;
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
            has_done_initial_load: false,
            search_value: '',
        };
    }
    componentDidMount(){
        try{
            this.loadSection(this.props.match.params.section);
        }catch(error){
            console.warn('found an error');
        }
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
    setSearchValue = (value) => {
        this.setState({search_value: value});
    }
    render() {
        const { match } = this.props;
        return (
            <Wrapper>
                <PickSection
                    selected_section={match.params.section}/>
                <MainContent>
                    <ToolBar>
                        <SearchBar
                            search_value={this.state.search_value}
                            setSearchValue={this.setSearchValue}/>
                        <ShowAllButton>
                            {`Show All ${this.state.fetched_data.size} Articles`}
                        </ShowAllButton>
                    </ToolBar>
                    {this.state.loading_options
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
