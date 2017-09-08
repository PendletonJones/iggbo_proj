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
`

const ArticleInfoWrapper = styled.div`
	/*border: solid green 2px;*/

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

const PublishedDate = styled.div`
	/*border: solid blue 2px;*/

	display: flex;
	flex-grow: 1;
	padding: 10px;
	/*margin: 10px;*/
`



const Abstract = styled.div`
	/*border: solid red 2px;*/

	/*display: flex;*/
	/*flex-grow: 1;*/
	padding: 10px;
	margin: 10px;
`
const ShortURL = styled.div`
	/*border: solid red 2px;*/

	/*display: flex;*/
	/*flex-grow: 1;*/
	padding: 10px;
	/*margin: 10px;*/
	color: blue;
	text-decoration: underline;
`

const ImageWrapper = styled.div`
	border: solid #353535 1px;

	display: flex;
	flex-shrink: 0;
	flex-grow: 0;
	padding: 10px;
	margin: 10px;

	min-height: 150px;
	max-height: 150px;
	/*min-width: 150px;*/
`



interface Props {
	fetched_data: Immutable.List;
}

interface State {
	show_all: boolean;
}


export default class DisplayStories extends Component {
    state: State
	constructor(props: Props){
		super(props);
		this.state = {
			show_all: false
		};
	}
    render() {
    	const items = this.state.show_all ? this.props.fetched_data : this.props.fetched_data.take(10);
    	const ny_time = (item) => moment(item.get('published_date')).tz('America/New_York').format('M/D/YYYY h:mm A zz');
    	const fiji_time = (item) => moment(item.get('published_date')).tz('Pacific/Fiji').format('M/D/YYYY h:mm A zz');
        return (
            <Wrapper>

                {items.map(item => (
                	<LinkWrapper
                		target="_blank"
                		href={item.get('url')}>
	                	<Article
	                		key={item.get('url')}>
	                		<ImageWrapper>
	                			<ImageWithFallback item={item}/>
	                		</ImageWrapper>
	                		<ArticleInfoWrapper>
			            		<Title>
			                		{item.get('title')}
			            		</Title>
			            		<Abstract>
			            			{item.get('abstract')}
			            		</Abstract>
			            		<ShortURL>
			            			{item.get('short_url')}
			            		</ShortURL>
			            		<PublishedDate>
			            			{`Published: ${ny_time(item)}, ${fiji_time(item)}`}
			            		</PublishedDate>
	                		</ArticleInfoWrapper>
	                	</Article>                		
                	</LinkWrapper>
                ))}
            </Wrapper>
        );
    }
}
