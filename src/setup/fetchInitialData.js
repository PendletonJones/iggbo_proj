import request from 'superagent';
import { sprintf } from 'sprintf-js';
import {
	API_KEY,
	API_ENDPOINT_TEMPLATE,
} from 'setup/constants';

console.log(request);

const final_url = sprintf(API_ENDPOINT_TEMPLATE, {section: 'home'});

export default () => {
	return request
			.get(final_url)
			.query({'api-key': API_KEY})
}