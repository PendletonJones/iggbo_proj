// @flow

import React, { Component } from "react";
import styled from 'styled-components';
import Immutable from 'immutable';
import ImageWithFallback from 'display_stories/ImageWithFallback';


const Wrapper = styled.div`
	overflow-y: scroll;
	border: solid green 2px;


	display: flex;
	flex-direction: column;
	flex-grow: 1;
`

const LinkWrapper = styled.a`
	border: solid purple 2px;

	text-decoration: none;
`


const Article = styled.div`
	border: solid red 2px;

	display: flex;
	flex-shrink: 0;
	flex-grow: 1;
	padding: 10px;
	margin: 10px;
`

const ArticleInfoWrapper = styled.div`
	border: solid green 2px;

	display: flex;
	flex-direction: column;
	/*flex-shrink: 0;*/
	flex-grow: 1;
	padding: 10px;
	margin: 10px;

`


const Title = styled.div`
	border: solid blue 2px;

	display: flex;
	flex-shrink: 0;
	flex-grow: 1;
	padding: 10px;
	margin: 10px;
`

const Abstract = styled.div`
	border: solid red 2px;

	/*display: flex;*/
	/*flex-grow: 1;*/
	padding: 10px;
	margin: 10px;
`

const ImageWrapper = styled.div`
	border: solid red 2px;

	display: flex;
	flex-shrink: 0;
	flex-grow: 0;
	padding: 10px;
	margin: 10px;

	min-height: 150px;
	min-width: 150px;
`

// const StyledImage = styled.img`
// 	background-image: url(${missing});
// `

interface Props {
	fetched_data: Immutable.List;
}

interface State {

}


export default class DisplayStories extends Component {
    state: State
	constructor(props: Props){
		super(props);
		this.state = {};
	}
    render() {
        return (
            <Wrapper>
                {this.props.fetched_data.map(item => (
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
	                		</ArticleInfoWrapper>
	                	</Article>                		
                	</LinkWrapper>
                ))}
            </Wrapper>
        );
    }
}
