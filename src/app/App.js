// @flow

import React, { Component } from "react";
import styled from 'styled-components';
import PickSection from 'pick_section/PickSection';
import DisplayStories from 'display_stories/DisplayStories';
import retrieveResults from 'data/retrieveResults';
import SearchBar from 'search/SearchBar';
import Immutable, { fromJS, List } from 'immutable';

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
    align-items: stretch;
    /*flex-grow: 1;*/
    padding: 10px;
    margin: 10px;
`

const ShowAllButton = styled.div`
    /*max-height: 40px;*/
    flex-grow: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    min-width: 200px;

    padding: 10px;
    user-select: none;
    cursor: pointer;

    &:hover {
        color: #4886ea;
    };
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
            show_all: false,
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
    getFinalData = () => {
        const final_data = this.state.fetched_data.reduce((acc, item) => {
            const bylline        = item.get('bylline', '').toLowerCase();
            const title          = item.get('title', '').toLowerCase();
            const abstract       = item.get('abstract', '').toLowerCase();
            
            const search_regex   = new RegExp(this.state.search_value.toLowerCase());
            const bylline_match  = bylline.match(search_regex);
            const title_match    = title.match(search_regex);
            const abstract_match = abstract.match(search_regex);

            const has_match      = bylline_match || title_match || abstract_match;
            // console.log(has_match);
            return (
                !!has_match 
                    ? acc.push(item.set('match_attributes', fromJS({
                            bylline_match: !!bylline_match,
                            title_match: !!title_match,
                            abstract_match: !!abstract_match,
                        }))) 
                    : acc
            );


        }, List());
        // console.log('final_data', final_data.toJS());
        return final_data;
    }
    setSearchValue = (value: string) => {
        this.setState({search_value: value});
    }
    render() {
        const { match } = this.props;
        const fetched_data = !!this.state.search_value ? this.getFinalData() : this.state.fetched_data;
        return (
            <Wrapper>
                <PickSection
                    selected_section={match.params.section}/>
                <MainContent>
                    <ToolBar>
                        <SearchBar
                            search_value={this.state.search_value}
                            setSearchValue={this.setSearchValue}/>
                        {(fetched_data.size > 10) && 
                            <ShowAllButton
                                onClick={() => this.setState(state => ({show_all: !state.show_all}))}
                                show_all={this.state.show_all}>
                                {this.state.show_all ? 'Show Less' : `Show All ${fetched_data.size} Articles`}
                            </ShowAllButton>
                        }
                    </ToolBar>
                    {this.state.loading_options
                        ?
                            <LoadingView>
                                Loading...
                            </LoadingView>
                        :
                            <DisplayStories
                                search_value={this.state.search_value}
                                show_all={this.state.show_all}
                                fetched_data={fetched_data}/>
                    }
                </MainContent>
            </Wrapper>
        );
    }
}
