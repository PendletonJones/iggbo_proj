// @flow

import React, { Component } from "react";
import styled from 'styled-components';
import Immutable from 'immutable';
import ImageWithFallback from 'display_stories/ImageWithFallback';
// import moment from 'moment';
import moment from 'moment-timezone-all';





const Wrapper = styled.div`
	overflow-y: scroll;
	/*border: solid green 2px;*/



	display: flex;
	flex-direction: column;
	flex-grow: 1;
`

const LinkWrapper = styled.a`
	/*border: solid purple 2px;*/

	text-decoration: none;
`


const Article = styled.div`
	border: solid #353535 1px;

	display: flex;
	flex-shrink: 0;
	flex-grow: 1;
	padding: 10px;
	/*margin: 10px;*/
	max-height: 250px;
`

const ArticleInfoWrapper = styled.div`



	display: flex;
	flex-direction: column;
	/*flex-shrink: 0;*/
	flex-grow: 1;
	padding: 10px;
	margin: 10px;

	font-family: 'Karla', sans-serif;
	color: black;

`


const Title = styled.div`
	/*border: solid blue 2px;*/

	font-size: 18px;
	font-weight: bold;
	display: flex;
	flex-shrink: 0;
	flex-grow: 1;
	padding: 10px;
	/*margin: 10px;*/
	font-family: 'Abril Fatface', cursive;
	color: #353535;

`


const Byline = styled.div`
	font-size: 12px;
	display: flex;
	flex-shrink: 0;
	flex-grow: 1;
	padding: 10px;

	/*margin: 10px;*/
	font-family: 'Abril Fatface', cursive;
	color: #353535;
`




const Abstract = styled.div`
	/*border: solid red 2px;*/

	/*display: flex;*/
	/*flex-grow: 1;*/
	display: flex;
	padding: 10px;
	margin: 10px;
`

const PublishedDate = styled.div`
	/*border: solid blue 2px;*/

	display: flex;
	flex-grow: 1;
	padding: 10px;
	font-size: 10px;
	/*margin: 10px;*/
`
const ShortURL = styled.div`
	/*border: solid red 2px;*/

	/*display: flex;*/
	/*flex-grow: 1;*/
	padding: 10px;
	/*margin: 10px;*/
	color: blue;
	text-decoration: underline;
	font-size: 10px;
	user-select: auto;
`

const ImageWrapper = styled.div`
	/*border: solid #353535 1px;*/

/*	display: flex;
	flex-shrink: 0;
	flex-grow: 0;*/
	/*padding: 10px;*/
	/*margin: 10px;*/

	/*min-height: 150px;*/
	/*max-height: 150px;*/
	/*min-width: 150px;*/
`
const IconWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 5px;
`


const SearchSize = styled.div`
	display: flex;
	flex-shrink: 0;
	justify-content: center;
	align-items: center;
	margin: 10;

`




interface Props {
	fetched_data: Immutable.List;
}

interface State {

}


export default class DisplayStories extends Component {
    state: State
	constructor(props: Props){
		super(props);
		this.state = {
			
		};
	}
    render() {
    	const items = this.props.show_all ? this.props.fetched_data : this.props.fetched_data.take(10);
    	const ny_time = (item) => moment(item.get('published_date')).tz('America/New_York').format('M/D/YYYY h:mm A zz');
    	const fiji_time = (item) => moment(item.get('published_date')).tz('Pacific/Fiji').format('M/D/YYYY h:mm A zz');
    	const SearchIcon = <IconWrapper><i className="fa fa-search-plus"/></IconWrapper>;
        return (
            <Wrapper>
            	{this.props.search_value && 
            		<SearchSize>
            			{`${this.props.fetched_data.size} Results`}
            		</SearchSize>
            	 }
                {items.map(item => (

	                	<Article
	                		key={item.get('url')}>
	                		<ImageWrapper>
	                			<ImageWithFallback item={item}/>
	                		</ImageWrapper>
	                		<ArticleInfoWrapper>
			            		<Title>
			            			{item.getIn(['match_attributes', 'title_match']) && SearchIcon}
			                		{item.get('title')}
			            		</Title>
			            		<Byline>
				            		{item.getIn(['match_attributes', 'byline_match']) && SearchIcon}
			            			{item.get('byline')}
			            		</Byline>
			            		<Abstract>
				            		{item.getIn(['match_attributes', 'abstract_match']) && SearchIcon}
			            			{item.get('abstract')}
			            		</Abstract>
					           <LinkWrapper
						           	target="_blank"
						           	href={item.get('url')}>
				            		<ShortURL>
				            			{item.get('short_url')}
				            		</ShortURL>
		                		</LinkWrapper>
			            		<PublishedDate>
			            			{`Published: ${ny_time(item)}, ${fiji_time(item)}`}
			            		</PublishedDate>
	                		</ArticleInfoWrapper>
	                	</Article>                		
                ))}
            </Wrapper>
        );
    }
}
