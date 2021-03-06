import { List } from 'immutable';
export const API_KEY = '6f214642ad2741cb8f8315bb074fc31c';
export const API_ENDPOINT_TEMPLATE = 'https://api.nytimes.com/svc/topstories/v2/%(section)s.json';
export const SECTIONS = List([
	'opinion',
	'world',
	'national',
	'politics',
	'upshot',
	'nyregion',
	'business',
	'technology',
	'science',
	'health',
	'sports',
	'arts',
	'books',
	'movies',
	'theater',
	'sundayreview',
	'fashion',
	'tmagazine',
	'food',
	'travel',
	'magazine',
	'realestate',
	'automobiles',
	'obituaries',
	'insider',
].sort());